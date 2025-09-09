import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRideDetailsQuery } from "@/redux/features/rider/rides.api";
import { useAppSelector } from "@/redux/hook";
import { RideStatus } from "@/types/ride.types";
import { getRideDetails } from "@/utils/getRideDetails";
import {
  Car,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Star,
} from "lucide-react";

// Add type for props
interface LiveRideTrackingProps {
  rideId: string;
}

const LiveRideTracking = ({ rideId }: LiveRideTrackingProps) => {
  const { data, isLoading, isError } = useRideDetailsQuery(rideId);
  const addressCache = useAppSelector((state) => state.addressCache);

  // Extract ride details from API response
  const {
    // ride,
    dateStr,
    timeStr,
    pickup,
    destination,
    fareDisplay,
    status,
    // timeline,
  } = getRideDetails(data?.data, addressCache);

  // Simulate ETA and status for demo, but could be replaced with real-time data if available
  const [eta, setEta] = useState("8 mins");
  const [liveStatus, setLiveStatus] = useState(
    status === RideStatus.ACCEPTED ? "Driver en route" : status,
  );

  useEffect(() => {
    // Only simulate if ride is ongoing
    if (
      status === RideStatus.ACCEPTED ||
      status === RideStatus.IN_TRANSIT ||
      status === RideStatus.PICKED_UP ||
      status === RideStatus.REQUESTED
    ) {
      const etas = ["8 mins", "7 mins", "6 mins", "5 mins", "4 mins"];
      const statuses = [
        "Driver en route",
        "Driver nearby",
        "Driver arrived",
        "Trip started",
      ];
      const interval = setInterval(() => {
        setEta(etas[Math.floor(Math.random() * etas.length)]);
        setLiveStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Demo driver data
  const driver = {
    name: "Alex Johnson",
    rating: 4.8,
    carModel: "Toyota Prius",
    carPlate: "XYZ-1234",
  };
  const driverName = driver.name;
  const driverInitials = driverName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const driverRating = driver.rating.toFixed(1);
  const carInfo = `${driver.carModel} • ${driver.carPlate}`;
  // Trip status for badge
  const badgeStatus =
    status === RideStatus.ACCEPTED ||
    status === RideStatus.IN_TRANSIT ||
    status === RideStatus.PICKED_UP ||
    status === RideStatus.REQUESTED
      ? liveStatus
      : status;

  // Trip details
  const pickupDisplay = pickup || "--";
  const destinationDisplay = destination || "--";

  // Loading and error states
  if (isLoading) {
    return (
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Live Ride Tracking
          </CardTitle>
          <CardDescription>Your ride is in progress</CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <span className="text-muted-foreground">Loading ride details...</span>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data || !data.data) {
    return (
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Live Ride Tracking
          </CardTitle>
          <CardDescription>Your ride is in progress</CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <span className="text-destructive">Failed to load ride details.</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Live Ride Tracking
        </CardTitle>
        <CardDescription>
          {status === RideStatus.COMPLETED
            ? "Your ride is completed"
            : status === RideStatus.CANCELLED
              ? "This ride was cancelled"
              : "Your ride is in progress"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <Badge variant="secondary" className="mb-2">
            {badgeStatus}
          </Badge>
          {status === RideStatus.COMPLETED ||
          status === RideStatus.CANCELLED ? null : (
            <>
              <div className="text-primary text-2xl font-bold">{eta}</div>
              <p className="text-muted-foreground text-sm">Estimated arrival</p>
            </>
          )}
        </div>

        {/* Mock Map Area */}
        <div className="bg-muted flex h-48 items-center justify-center rounded-lg">
          <div className="text-center">
            <MapPin className="text-primary mx-auto mb-2 h-12 w-12" />
            <p className="text-muted-foreground text-sm">Live Map View</p>
            <p className="text-muted-foreground text-xs">
              Real-time location tracking
            </p>
          </div>
        </div>

        {/* Driver Details */}
        <div className="border-border rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
              <span className="text-primary-foreground font-semibold">
                {driverInitials}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{driverName}</h4>
              <div className="mb-1 flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">
                  {driverRating === "No rating"
                    ? "No rating"
                    : `${driverRating} rating`}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Car className="h-4 w-4" />
                <span>{carInfo}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" disabled>
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1" disabled>
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">From:</span>
            <span className="font-medium">{pickupDisplay}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-muted-foreground">To:</span>
            <span className="font-medium">{destinationDisplay}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{dateStr}</span>
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{timeStr}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Fare:</span>
            <span className="font-medium">
              {typeof fareDisplay === "number" ? `$${fareDisplay}` : "--"}
            </span>
          </div>
        </div>

        {status !== RideStatus.COMPLETED && status !== RideStatus.CANCELLED && (
          <Button variant="destructive" className="w-full">
            Cancel Ride
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveRideTracking;
