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
import {
  Car,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Star,
} from "lucide-react";
import { getRideDetails } from "@/utils/getRideDetails";

const LiveRideTracking = ({ rideId }) => {
  const { data, isLoading, isError } = useRideDetailsQuery(rideId);
  // address of lng,lat
  const addressCache = useAppSelector((state) => state.addressCache);
  // Extract ride details from API response
  const {
    ride,
    // pickupKey,
    // destKey,
    // requestedAt,
    dateStr,
    timeStr,
    pickup,
    destination,
    // fareEstimated,
    // fareFinal,
    fareDisplay,
    status,
    timeline,
  } = getRideDetails(data.data, addressCache);

  const [eta, setEta] = useState("8 mins");
  const [status, setStatus] = useState("Driver en route");

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const etas = ["8 mins", "7 mins", "6 mins", "5 mins", "4 mins"];
      const statuses = ["Driver en route", "Driver nearby", "Driver arrived"];

      setEta(etas[Math.floor(Math.random() * etas.length)]);
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Live Ride Tracking
        </CardTitle>
        <CardDescription>Your ride is in progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <Badge variant="secondary" className="mb-2">
            {status}
          </Badge>
          <div className="text-primary text-2xl font-bold">{eta}</div>
          <p className="text-muted-foreground text-sm">Estimated arrival</p>
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
              <span className="text-primary-foreground font-semibold">JS</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">John Smith</h4>
              <div className="mb-1 flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">4.8 rating</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Car className="h-4 w-4" />
                <span>Toyota Camry • ABC-123</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
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
            <span className="font-medium">Downtown Mall</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-muted-foreground">To:</span>
            <span className="font-medium">International Airport</span>
          </div>
        </div>

        <Button variant="destructive" className="w-full">
          Cancel Ride
        </Button>
      </CardContent>
    </Card>
  );
};

export default LiveRideTracking;
