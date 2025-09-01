import { useState } from "react";
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
import { Car, Clock, CreditCard, MapPin, Star, User } from "lucide-react";

import LiveRideTracking from "./LiveRideTracking";
import ProfileManagement from "./ProfileManagement";
import RideHistory from "./RideHistory";
import RideRequestForm from "./RideRequestForm";

const RiderDashboard = () => {
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const currentRides = [
    {
      id: 1,
      driver: "John Smith",
      car: "Toyota Camry",
      pickup: "Downtown Mall",
      destination: "Airport",
      status: "On the way",
      eta: "8 mins",
      rating: 4.8,
    },
  ];

  const rideHistory = [
    {
      id: 1,
      date: "Today",
      from: "Home",
      to: "Office",
      cost: "$12.50",
      rating: 5,
    },
    {
      id: 2,
      date: "Yesterday",
      from: "Restaurant",
      to: "Home",
      cost: "$8.75",
      rating: 4,
    },
  ];
  const { data: userInfo } = useUserInfoQuery(undefined);
  //   console.log(userInfo);
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
                      {currentRides.map((ride) => (
                        <div
                          key={ride.id}
                          className="border-border rounded-lg border p-4"
                        >
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{ride.driver}</h4>
                              <p className="text-muted-foreground text-sm">
                                {ride.car}
                              </p>
                            </div>
                            <Badge variant="secondary">{ride.status}</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="text-primary h-4 w-4" />
                              <span>
                                {ride.pickup} → {ride.destination}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="text-primary h-4 w-4" />
                              <span>ETA: {ride.eta}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{ride.rating}</span>
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
                      ))}
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
                    {rideHistory.slice(0, 3).map((ride) => (
                      <div
                        key={ride.id}
                        className="border-border rounded-lg border p-4"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <p className="font-medium">
                              {ride.from} → {ride.to}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {ride.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{ride.cost}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{ride.rating}</span>
                            </div>
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
                    ))}
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
