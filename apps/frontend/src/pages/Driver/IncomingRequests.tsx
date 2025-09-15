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
import { useDriverProfileQuery } from "@/redux/features/driver/driver.api";
import { useGetNearbyRideRequestsQuery } from "@/redux/features/rider/rides.api";
import { DriverOnlineStatus } from "@/types/driver.types";
import { getGeoLocation } from "@/utils/getGeoLocation";
import { Clock, MapPin, Phone, User } from "lucide-react";
import { toast } from "sonner";

const IncomingRequests = () => {
  // Use ridesApi hooks for driver ride requests
  const { data: driverProfile } = useDriverProfileQuery(undefined);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const rideRequestParams = {
    lat: location?.latitude,
    lon: location?.longitude,
    radius: 10,
  };
  const isOnline =
    driverProfile?.data?.onlineStatus === DriverOnlineStatus.ONLINE;

  const { data: IncomingRequests } = useGetNearbyRideRequestsQuery(
    rideRequestParams,
    {
      skip: !isOnline,
    },
  );

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getGeoLocation();
        setLocation(loc);
      } catch (error) {
        console.error("Failed to get geolocation:", error);
        setLocation(null);
      }
    };
    fetchLocation();
  }, []);

  const handleAccept = (requestId: number, riderName: string) => {
    // setRequests(requests.filter((req) => req.id !== requestId));
    toast.success(`You've accepted the ride request from ${riderName}.`);
  };

  const handleReject = (requestId: number, riderName: string) => {
    // setRequests(requests.filter((req) => req.id !== requestId));
    toast.error(`You've declined the ride request from ${riderName}.`);
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Incoming Ride Requests
        </CardTitle>
        <CardDescription>
          Accept or decline ride requests from nearby riders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!IncomingRequests ? (
          <div className="py-8 text-center">
            <Phone className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">
              No incoming requests at the moment
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Make sure you're online to receive ride requests
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border-border space-y-4 rounded-lg border p-4"
              >
                {/* Request Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{request.rider}</span>
                    <Badge variant="outline" className="text-xs">
                      ⭐ {request.riderRating}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-primary text-lg font-semibold">
                      {request.fare}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {request.requestTime}
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Pickup</div>
                      <div className="text-muted-foreground text-sm">
                        {request.pickup}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">Destination</div>
                      <div className="text-muted-foreground text-sm">
                        {request.destination}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {request.distance}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />~{request.estimatedTime}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleReject(request.id, request.rider)}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAccept(request.id, request.rider)}
                  >
                    Accept Ride
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomingRequests;
