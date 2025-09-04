import { useEffect, useMemo, useState } from "react";
import RideDetailsModal from "@/components/RideDetailsModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useRideHistoryQuery } from "@/redux/features/rider/rides.api";
import { useAppSelector } from "@/redux/hook";
import { setAddress } from "@/redux/slices/addressSlice";
import { RideStatus, type IRide } from "@/types/ride.types";
import { fetchAddress } from "@/utils/fetchAddress";
import { format } from "date-fns";
import { Car, CreditCard, MapPin, Star, User } from "lucide-react";
import { useDispatch } from "react-redux";

import LiveRideTracking from "./LiveRideTracking";
import ProfileManagement from "./ProfileManagement";
import RideHistory from "./RideHistory";
import RideRequestForm from "./RideRequestForm";

const RiderDashboard = () => {
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // axios call
  const { data: userInfo } = useUserInfoQuery(undefined);
  const rideHistoryResult = useRideHistoryQuery(undefined);
  const rideHistory: IRide[] = useMemo(
    () => rideHistoryResult?.data?.data || [],
    [rideHistoryResult?.data?.data],
  );

  const addressCache = useAppSelector((state) => state.addressCache);
  const dispatch = useDispatch();
  const currentRides = rideHistory.filter(
    (ride) => ride.rideStatus === RideStatus.REQUESTED,
  );

  useEffect(() => {
    const fetchAllAddresses = async () => {
      for (const ride of rideHistory) {
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

    if (rideHistory.length > 0) {
      fetchAllAddresses();
    }
  }, [rideHistory, addressCache, dispatch]);

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 pb-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
            <User className="text-primary-foreground h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              Rider Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {userInfo?.data?.userName}!
            </p>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Total Rides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary text-3xl font-bold">247</div>
                  <p className="text-muted-foreground text-sm">
                    This month: 23
                  </p>
                </CardContent>
              </Card>

              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Total Spent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary text-3xl font-bold">$1,247</div>
                  <p className="text-muted-foreground text-sm">
                    This month: $156
                  </p>
                </CardContent>
              </Card>

              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-primary text-3xl font-bold">4.9</div>
                  <p className="text-muted-foreground text-sm">
                    Based on your rides
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Current Rides & Recent History */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <CardHeader>
                  <CardTitle>Current Rides</CardTitle>
                  <CardDescription>Your active rides</CardDescription>
                </CardHeader>
                <CardContent>
                  {currentRides.length > 0 ? (
                    <div className="space-y-4">
                      {currentRides.map((ride) => {
                        const pickupKey = `${ride.pickupLocation.latitude},${ride.pickupLocation.longitude}`;
                        const destKey = `${ride.destinationLocation.latitude},${ride.destinationLocation.longitude}`;
                        const pickup = addressCache[pickupKey] ?? pickupKey;
                        const destination = addressCache[destKey] ?? destKey;
                        return (
                          <div
                            key={ride._id}
                            className="border-border rounded-lg border p-4"
                          >
                            <div className="mb-3 flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">
                                  {ride.driverId}
                                </h4>
                              </div>
                              <Badge variant="secondary">
                                {ride.rideStatus}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="text-primary h-4 w-4" />
                                <span>
                                  {pickup} → {destination}
                                </span>
                              </div>
                            </div>
                            <Button
                              className="mt-3 w-full"
                              variant="outline"
                              onClick={() => setActiveTab("tracking")}
                            >
                              Track Ride
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Car className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                      <p className="text-muted-foreground">No active rides</p>
                      <Button
                        className="mt-4"
                        onClick={() => setActiveTab("book")}
                      >
                        Book a Ride
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card
                className="animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <CardHeader>
                  <CardTitle>Recent Rides</CardTitle>
                  <CardDescription>Your latest trips</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideHistory.slice(0, 3).map((ride) => {
                      const pickupKey = `${ride.pickupLocation.latitude},${ride.pickupLocation.longitude}`;
                      const destKey = `${ride.destinationLocation.latitude},${ride.destinationLocation.longitude}`;
                      const pickup = addressCache[pickupKey] ?? pickupKey;
                      const destination = addressCache[destKey] ?? destKey;
                      return (
                        <div
                          key={ride._id}
                          className="border-border rounded-lg border p-4"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <p className="font-small">
                                {pickup} → {destination}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {format(
                                  new Date(ride?.timestamps?.requested ?? ""),
                                  "PPP",
                                )}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                $
                                {ride.fareFinal
                                  ? ride.fareFinal
                                  : ride.fareEstimated}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => setShowRideDetails(true)}
                          >
                            View Details
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => setActiveTab("history")}
                  >
                    View All History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="book">
            <RideRequestForm />
          </TabsContent>

          <TabsContent value="tracking">
            <LiveRideTracking />
          </TabsContent>

          <TabsContent value="history">
            <RideHistory />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileManagement />
          </TabsContent>
        </Tabs>

        <RideDetailsModal
          isOpen={showRideDetails}
          onClose={() => setShowRideDetails(false)}
        />
      </main>
    </div>
  );
};

export default RiderDashboard;
