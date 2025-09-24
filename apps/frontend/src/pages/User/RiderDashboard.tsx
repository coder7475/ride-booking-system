import { useEffect, useMemo, useState } from "react";
import RideDetailsModal from "@/components/RideDetailsModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import {
  ridesApi,
  useCancelRideMutation,
  useRideHistoryQuery,
} from "@/redux/features/rider/rides.api";
import { useAppSelector } from "@/redux/hook";
import { setAddress } from "@/redux/slices/addressSlice";
import { RideStatus, type IRide } from "@/types/ride.types";
import { fetchAddress } from "@/utils/fetchAddress";
import { format } from "date-fns";
import { Car, CreditCard, MapPin, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import LiveRideTracking from "./LiveRideTracking";
import ProfileManagement from "./ProfileManagement";
import RideHistory from "./RideHistory";
import RideRequestForm from "./RideRequestForm";

const RiderDashboard = () => {
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [rideId, setRideId] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [cancelRide] = useCancelRideMutation();

  // For AlertDialog cancel ride
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rideIdToCancel, setRideIdToCancel] = useState<string | null>(null);

  // axios call
  const { data: userInfo } = useUserInfoQuery(undefined);
  const rideHistoryResult = useRideHistoryQuery(undefined);
  const rideHistory: IRide[] = useMemo(
    () => rideHistoryResult?.data?.data || [],
    [rideHistoryResult?.data?.data],
  );
  // Count rides created in the current month
  const rideHistoryThisMonth = rideHistory.filter((ride) => {
    if (!ride.createdAt) return false;
    const rideDate = new Date(ride.createdAt);
    const now = new Date();
    return (
      rideDate.getFullYear() === now.getFullYear() &&
      rideDate.getMonth() === now.getMonth()
    );
  });
  const rideThisMonth = rideHistoryThisMonth.length;

  // spent calculation
  const totalSpent = rideHistory.reduce(
    (sum, ride) =>
      sum +
      (typeof ride.fareFinal === "number" &&
      ride.rideStatus === RideStatus.COMPLETED
        ? ride.fareFinal
        : 0),
    0,
  );
  const spentThisMonth = rideHistoryThisMonth.reduce(
    (sum, ride) =>
      sum +
      (typeof ride.fareFinal === "number" &&
      ride.rideStatus === RideStatus.COMPLETED
        ? ride.fareFinal
        : 0),
    0,
  );

  // address of lng,lat
  const addressCache = useAppSelector((state) => state.addressCache);
  const dispatch = useDispatch();

  const activeStatuses = [
    RideStatus.REQUESTED,
    RideStatus.ACCEPTED,
    RideStatus.PICKED_UP,
    RideStatus.IN_TRANSIT,
  ];
  const currentRides = rideHistory.filter((ride) =>
    activeStatuses.includes(ride.rideStatus),
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

  const handleCancelRide = async (id: string) => {
    try {
      const res = await cancelRide(id).unwrap();

      if (res?.success) {
        dispatch(ridesApi.util.resetApiState());
        toast.success("Ride Cancel Successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel ride");
    }
  };

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
                  <div className="text-primary text-3xl font-bold">
                    {rideHistory.length}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    This month: {rideThisMonth}
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
                  <div className="text-primary text-3xl font-bold">
                    ${totalSpent}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    This month: ${spentThisMonth}
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
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-col">
                                <span className="text-muted-foreground text-xs font-medium tracking-wide">
                                  Trip ID
                                </span>
                                <span className="text-primary font-mono text-sm">
                                  {ride._id}
                                </span>
                              </div>
                              <Badge
                                variant={
                                  ride.rideStatus === RideStatus.COMPLETED
                                    ? "default"
                                    : ride.rideStatus === RideStatus.CANCELLED
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="capitalize"
                              >
                                {ride.rideStatus
                                  .replace(/_/g, " ")
                                  .toLowerCase()}
                              </Badge>
                              <div className="flex flex-col items-end">
                                <span className="text-muted-foreground text-xs font-medium tracking-wide">
                                  Estimated Fare
                                </span>
                                <span className="text-lg font-semibold text-green-600">
                                  ${ride.fareEstimated}
                                </span>
                              </div>
                              <p className="text-muted-foreground text-sm">
                                {format(
                                  new Date(ride?.timestamps?.requested ?? ""),
                                  "PPP",
                                )}
                              </p>
                            </div>
                            <div className="mb-4 flex items-center gap-3 text-sm">
                              <MapPin className="text-primary h-4 w-4" />
                              <span className="text-foreground font-medium">
                                {pickup}
                              </span>
                              <span className="text-muted-foreground">→</span>
                              <span className="text-foreground font-medium">
                                {destination}
                              </span>
                            </div>

                            <div className="flex flex-col gap-2">
                              {ride.rideStatus !== RideStatus.REQUESTED && (
                                <Button
                                  className="w-full cursor-pointer font-semibold"
                                  variant="outline"
                                  onClick={() => {
                                    setRideId(ride._id);
                                    setActiveTab("tracking");
                                  }}
                                >
                                  Track Ride
                                </Button>
                              )}
                              {ride.rideStatus === RideStatus.REQUESTED && (
                                <Button
                                  className="w-full cursor-pointer font-semibold"
                                  variant="destructive"
                                  onClick={() => {
                                    setRideIdToCancel(ride._id);
                                    setCancelDialogOpen(true);
                                  }}
                                >
                                  Cancel Ride
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {/* Cancel Ride AlertDialog */}
                      <AlertDialog
                        open={cancelDialogOpen}
                        onOpenChange={setCancelDialogOpen}
                      >
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to cancel this ride?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will cancel
                              your ride request.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => {
                                setCancelDialogOpen(false);
                                setRideIdToCancel(null);
                              }}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="cursor-pointer"
                              onClick={async () => {
                                if (rideIdToCancel) {
                                  await handleCancelRide(rideIdToCancel);
                                }
                                setCancelDialogOpen(false);
                                setRideIdToCancel(null);
                              }}
                            >
                              Yes, Cancel Ride
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Car className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                      <p className="text-muted-foreground">No active rides</p>
                      <Button
                        className="mt-4 cursor-pointer"
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
                          className="border-border bg-card/80 rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="text-primary truncate text-sm font-semibold">
                                <span className="inline-block align-middle">
                                  <MapPin className="text-muted-foreground mr-1 inline-block h-4 w-4" />
                                </span>
                                {pickup}
                                <span className="text-muted-foreground mx-2">
                                  →
                                </span>
                                <span className="inline-block align-middle">
                                  <MapPin className="text-muted-foreground mr-1 inline-block h-4 w-4" />
                                </span>
                                {destination}
                              </p>
                              <p className="text-muted-foreground mt-1 text-xs">
                                {format(
                                  new Date(ride?.timestamps?.requested ?? ""),
                                  "PPP",
                                )}
                              </p>
                            </div>
                            <div className="flex min-w-[90px] flex-col items-end gap-1">
                              <Badge
                                variant={
                                  ride.rideStatus === RideStatus.COMPLETED
                                    ? "default"
                                    : ride.rideStatus === RideStatus.CANCELLED
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="px-3 py-1 text-xs capitalize"
                              >
                                {ride.rideStatus
                                  .replace(/_/g, " ")
                                  .toLowerCase()}
                              </Badge>
                              <span className="text-base font-bold text-green-700 dark:text-green-400">
                                $
                                {ride.fareFinal
                                  ? ride.fareFinal
                                  : ride.fareEstimated}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary hover:bg-primary/10 mt-2 w-full cursor-pointer rounded-md font-medium"
                            onClick={() => {
                              setRideId(ride._id);
                              setShowRideDetails(true);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full cursor-pointer"
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
            <LiveRideTracking rideId={rideId} />
          </TabsContent>

          <TabsContent value="history">
            <RideHistory />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileManagement />
          </TabsContent>
        </Tabs>

        <RideDetailsModal
          rideId={rideId}
          isOpen={showRideDetails}
          onClose={() => setShowRideDetails(false)}
        />
      </main>
    </div>
  );
};

export default RiderDashboard;
