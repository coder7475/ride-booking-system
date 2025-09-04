import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingCircle from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEstimateFareQuery,
  useRideRequestMutation,
} from "@/redux/features/rider/rides.api";
import { PaymentGateway } from "@/types/payment.types";
import { fetchCoordinates } from "@/utils/fetchCoordinates";
import { DollarSign, MapPin } from "lucide-react";

const RideRequestForm = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PaymentGateway.CASH);
  const [pickupCoords, setPickupCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "estimate" | "confirm" | "success">(
    "form",
  );

  // ride request endpoint
  const [rideRequest] = useRideRequestMutation();

  // call the query hook
  const {
    data: fareData,
    error: fareError,
    isLoading: fareLoading,
  } = useEstimateFareQuery({
    pickupLat: pickupCoords?.lat,
    pickupLng: pickupCoords?.lng,
    destLat: destinationCoords?.lat,
    destLng: destinationCoords?.lng,
  });

  if (fareLoading) {
    return <LoadingCircle />;
  }

  //  Estimate Fare
  const handleEstimate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const pickupResult = await fetchCoordinates(pickup);
      const destResult = await fetchCoordinates(destination);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!pickupResult || !destResult) {
        setError("Could not validate one or both locations. Try again.");
        setLoading(false);
        return;
      }

      setPickupCoords(pickupResult);
      setDestinationCoords(destResult);

      let fare = 0;
      try {
        if (fareData?.success && !fareLoading) {
          fare = fareData?.data?.fare;
        } else {
          setError("Failed to estimate fare. Please try again.");
          setLoading(false);
          return;
        }
      } catch {
        setError(
          `Failed to estimate fare. Please try again. Error: ${fareError}`,
        );
        setLoading(false);
        return;
      }
      setEstimatedFare(`$${fare}`);
      setStep("estimate");
    } catch {
      setError("Error fetching location data.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Confirm Ride
  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      // Validate coordinates before submitting
      let pickupResult = pickupCoords;
      let destResult = destinationCoords;

      if (!pickupResult) {
        pickupResult = await fetchCoordinates(pickup);
        if (pickupResult) setPickupCoords(pickupResult);
      }
      if (!destResult) {
        destResult = await fetchCoordinates(destination);
        if (destResult) setDestinationCoords(destResult);
      }

      if (!pickupResult || !destResult) {
        setError("Could not validate one or both locations. Try again.");
        setLoading(false);
        return;
      }
      // console.log(typeof ?.lat);
      // Create pickup request object
      const rideInfo = {
        pickupLocation: {
          latitude: Number(pickupResult.lat),
          longitude: Number(pickupResult.lng),
        },
        destinationLocation: {
          latitude: Number(destResult.lat),
          longitude: Number(destResult.lng),
        },
        fareEstimated: fareData?.data?.fare ?? 0,
        fareFinal: 0.0,
        timestamps: {
          requested: new Date().toISOString(),
        },
        paymentGateway: paymentMethod,
      };
      // console.log(rideInfo);

      const result = await rideRequest(rideInfo).unwrap();
      if (result?.success) {
        setStep("success");
        setError("");
      } else {
        setError(result?.message || "Failed to submit ride request.");
      }
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        setError(`Failed to submit ride request: ${(err as Error).message}`);
      } else {
        setError("Failed to submit ride request.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 0: Reset to form
  const handleBackToForm = () => {
    setStep("form");
    setEstimatedFare(null);
    setError("");
  };

  return (
    <Card className="animate-slide-up max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Request a Ride
        </CardTitle>
        <CardDescription>Book your ride in just a few steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "form" && (
          <form className="space-y-4" onSubmit={handleEstimate}>
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <Input
                id="pickup"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as PaymentGateway)
                }
                name="paymentMethod"
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentGateway.SSLCOMMERZ}>
                    SSLCOMMERZ
                  </SelectItem>
                  <SelectItem value={PaymentGateway.CASH} defaultChecked>
                    Cash
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              className="w-full cursor-pointer"
              type="submit"
              disabled={!pickup || !destination || loading}
            >
              {loading ? "Calculating..." : "Show Fare Estimate"}
            </Button>
          </form>
        )}

        {step === "estimate" && (
          <div className="space-y-4">
            <div className="bg-muted space-y-2 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Estimated Fare
                </span>
                <span className="text-primary font-semibold">
                  {estimatedFare}
                </span>
              </div>
            </div>
            {pickupCoords && destinationCoords && (
              <div className="mt-2 text-xs text-gray-500">
                <p>
                  Pickup: {pickupCoords.lat}, {pickupCoords.lng}
                </p>
                <p>
                  Destination: {destinationCoords.lat}, {destinationCoords.lng}
                </p>
              </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-1/2 cursor-pointer"
                onClick={handleBackToForm}
                disabled={loading}
              >
                Edit Details
              </Button>
              <Button
                type="button"
                className="w-1/2 cursor-pointer"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm Ride Request"}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-4">
            <p className="text-sm text-green-600">
              Ride request submitted successfully!
            </p>
            <Button
              type="button"
              className="w-full cursor-pointer"
              onClick={() => {
                setPickup("");
                setDestination("");
                setPickupCoords(null);
                setDestinationCoords(null);
                setEstimatedFare(null);

                setError("");
                setStep("form");
              }}
            >
              Book Another Ride
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RideRequestForm;
