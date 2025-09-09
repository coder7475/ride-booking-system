import { useState } from "react";
import Overview from "@/components/driver/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Car, Clock, DollarSign, Star, User } from "lucide-react";

import ActiveRideManagement from "./ActiveRideManagement";
import AvailabilityControl from "./AvailabilityControl";
import DriverProfileManagement from "./DriverProfileManagement";
import DriverRideHistory from "./DriverRideHistory";
import EarningsDashboard from "./EarningsDashboard";
import IncomingRequests from "./IncomingRequests";

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const todayStats = {
    rides: 12,
    earnings: "$247.50",
    hours: "8.5",
    rating: 4.9,
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 pb-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
            <Car className="text-primary-foreground h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, Alex!</p>
          </div>
          <div className="ml-auto">
            <AvailabilityControl />
          </div>
        </div>

        {/* Today's Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Car className="h-4 w-4" />
                Today's Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {todayStats.rides}
              </div>
              <p className="text-muted-foreground text-xs">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4" />
                Today's Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {todayStats.earnings}
              </div>
              <p className="text-muted-foreground text-xs">
                +$47 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Hours Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {todayStats.hours}
              </div>
              <p className="text-muted-foreground text-xs">Target: 10 hours</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {todayStats.rating}
              </div>
              <p className="text-muted-foreground text-xs">
                Based on 247 rides
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Active
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Earnings
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Overview />
          </TabsContent>

          <TabsContent value="requests">
            <IncomingRequests />
          </TabsContent>

          <TabsContent value="active">
            <ActiveRideManagement />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsDashboard />
          </TabsContent>

          <TabsContent value="history">
            <DriverRideHistory />
          </TabsContent>

          <TabsContent value="profile">
            <DriverProfileManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DriverDashboard;
