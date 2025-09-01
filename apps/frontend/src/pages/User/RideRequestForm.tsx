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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, DollarSign, MapPin } from "lucide-react";

const RideRequestForm = () => {
  const API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("economy");
  const [paymentMethod, setPaymentMethod] = useState("card");
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
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<"form" | "estimate" | "confirm" | "success">(
    "form",
  );

  // Helper: Fetch lat/lng from address
  const fetchCoordinates = async (address: string) => {
    // Wait 1 second before each geocoding request for rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(
      `https://geocode.maps.co/search?q=${encodeURIComponent(
        address,
      )}&api_key=${API_KEY}`,
    );
    const data = await res.json();
    console.log(data[0]);
    if (data && data.length > 0) {
      return {
        lat: data[0].lat,
        lng: data[0].lng,
      };
    }
    return null;
  };

  // Step 1: Estimate Fare
  const handleEstimate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const pickupResult = await fetchCoordinates(pickup);
      const destResult = await fetchCoordinates(destination);

      if (!pickupResult || !destResult) {
        setError("Could not validate one or both locations. Try again.");
        setLoading(false);
        return;
      }

      setPickupCoords(pickupResult);
      setDestinationCoords(destResult);

      // Dummy fare calculation based on "distance"
      const distance =
        Math.sqrt(
          Math.pow(destResult.lat - pickupResult.lat, 2) +
            Math.pow(destResult.lng - pickupResult.lng, 2),
        ) * 111; // approx km conversion

      // Adjust fare based on vehicle type
      let multiplier = 1;
      if (vehicleType === "comfort") multiplier = 1.5;
      if (vehicleType === "premium") multiplier = 2.2;

      const fare = (distance * 0.8 * multiplier + 5).toFixed(2); // Example pricing formula
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
    setSuccess(false);

    try {
      // Validate coordinates before submitting
      let pickupResult = pickupCoords;
      let destResult = destinationCoords;

      if (!pickupResult) {
        pickupResult = await fetchCoordinates(pickup);
        setPickupCoords(pickupResult);
      }
      if (!destResult) {
        destResult = await fetchCoordinates(destination);
        setDestinationCoords(destResult);
      }

      if (!pickupResult || !destResult) {
        setError("Could not validate one or both locations. Try again.");
        setLoading(false);
        return;
      }

      // Simulate API call to submit ride request
      // Replace with actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setStep("success");
      setError("");
    } catch {
      setError("Failed to submit ride request.");
    } finally {
      setLoading(false);
    }
  };

  // Step 0: Reset to form
  const handleBackToForm = () => {
    setStep("form");
    setEstimatedFare(null);
    setError("");
    setSuccess(false);
  };

  return (
    <Card className="animate-slide-up">
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
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                value={vehicleType}
                onValueChange={setVehicleType}
                name="vehicleType"
              >
                <SelectTrigger id="vehicleType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy - $</SelectItem>
                  <SelectItem value="comfort">Comfort - $$</SelectItem>
                  <SelectItem value="premium">Premium - $$$</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                name="paymentMethod"
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit Card •••• 4242</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              className="w-full"
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
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Estimated Time
                </span>
                <span>15-20 mins</span>
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
                className="w-1/2"
                onClick={handleBackToForm}
                disabled={loading}
              >
                Edit Details
              </Button>
              <Button
                type="button"
                className="w-1/2"
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
              className="w-full"
              onClick={() => {
                setPickup("");
                setDestination("");
                setPickupCoords(null);
                setDestinationCoords(null);
                setEstimatedFare(null);
                setSuccess(false);
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
