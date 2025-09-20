import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ridesApi,
  useAcceptRideMutation,
  useGetNearbyRideRequestsQuery,
} from "@/redux/features/rider/rides.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setAddress } from "@/redux/slices/addressSlice";
import type { IRide } from "@/types/ride.types";
import { fetchAddress } from "@/utils/fetchAddress";
import { getGeoLocation } from "@/utils/getGeoLocation";
import { MapPin, Phone, User } from "lucide-react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const IncomingRequests = () => {
  const [acceptRide] = useAcceptRideMutation();

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const rideRequestParams = {
    lat: location?.latitude,
    lon: location?.longitude,
    radius: 10,
  };

  const [cookie] = useCookies(["driverOnlineStatus"]);
  const isOnline = cookie.driverOnlineStatus;

  // Only fetch ride requests if online and location is available
  const { data: incomingRequestsData } = useGetNearbyRideRequestsQuery(
    rideRequestParams,
    {
      skip: !isOnline || !location?.latitude || !location?.longitude,
    },
  );
  const dispatch = useAppDispatch();
  const addressCache = useAppSelector((state) => state.addressCache);
  const rides: IRide[] = incomingRequestsData?.data || [];

  useEffect(() => {
    // fetch driver location
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

    // fetch pickup and destination
    const fetchAllAddresses = async () => {
      for (const ride of rides) {
        const pickupKey = `${ride.pickupLocation.latitude},${ride.pickupLocation.longitude}`;
        const destKey = `${ride.destinationLocation.latitude},${ride.destinationLocation.longitude}`;

        if (!addressCache[pickupKey]) {
          const addr = await fetchAddress(
            ride.pickupLocation.latitude,
            ride.pickupLocation.longitude,
          );
          dispatch(setAddress({ key: pickupKey, value: addr ?? pickupKey }));
        }

        if (!addressCache[destKey]) {
          const addr = await fetchAddress(
            ride.destinationLocation.latitude,
            ride.destinationLocation.longitude,
          );
          dispatch(setAddress({ key: destKey, value: addr ?? destKey }));
        }
      }
    };

    if (rides.length > 0) {
      fetchAllAddresses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, addressCache]);

  const handleAccept = async (requestId: string) => {
    try {
      const res = await acceptRide(requestId).unwrap();

      dispatch(ridesApi.util.resetApiState());
      toast.success(`${res.message}`);
    } catch {
      toast.error(`You've failed to accept the ride.`);
    }
  };

  // const handleReject = (requestId: string, riderName: string) => {
  //   toast.error(
  //     `You've declined the ride request from ${riderName} - ${requestId}.`,
  //   );
  // };

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
        {!isOnline ? (
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
            {rides.map((request: IRide) => {
              // Format fare
              const fare = request.fareEstimated
                ? `$${request.fareEstimated}`
                : "N/A";
              // Format time
              const requestTime = request.timestamps?.requested
                ? new Date(request.timestamps.requested).toLocaleString()
                : "";
              // Show coordinates as fallback for address
              const pickupKey = `${request.pickupLocation.latitude},${request.pickupLocation.longitude}`;
              const destKey = `${request.destinationLocation.latitude},${request.destinationLocation.longitude}`;
              const pickup = addressCache[pickupKey] || pickupKey || "Unknown";
              const destination = addressCache[destKey] || destKey || "Unknown";

              return (
                <div
                  key={request._id}
                  className="border-border space-y-4 rounded-lg border p-4"
                >
                  {/* Request Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {/* <span className="font-medium">{riderName}</span> */}
                    </div>
                    <div className="text-right">
                      <div className="text-primary text-lg font-semibold">
                        {fare}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {requestTime}
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
                          {pickup}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
                      <div>
                        <div className="text-sm font-medium">Destination</div>
                        <div className="text-muted-foreground text-sm">
                          {destination}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {/* <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleReject(request._id, riderName)}
                    >
                      Decline
                    </Button> */}
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAccept(request._id)}
                    >
                      Accept Ride
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomingRequests;
