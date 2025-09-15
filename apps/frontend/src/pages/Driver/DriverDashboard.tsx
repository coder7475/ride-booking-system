// import { useEffect, useState } from "react";
import Overview from "@/components/driver/Overview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useDriverProfileQuery } from "@/redux/features/driver/driver.api";
// import { useGetNearbyRideRequestsQuery } from "@/redux/features/rider/rides.api";
import { DriverApprovalStatus } from "@/types/driver.types";
// import { getGeoLocation } from "@/utils/getGeoLocation";
import { AlertTriangle, Car, DollarSign } from "lucide-react";
import { useNavigate } from "react-router";

import AvailabilityControl from "./AvailabilityControl";

const DriverDashboard = () => {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { data: driverProfile } = useDriverProfileQuery(undefined);

  const navigate = useNavigate();

  const isDriver = driverProfile?.data;
  const approvalStatus = driverProfile?.data?.approvalStatus;

  // console.log(IncomingRequests);
  const todayStats = {
    rides: 12,
    earnings: "$247.50",
    hours: "8.5",
    rating: 4.9,
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 pb-8">
        {approvalStatus === DriverApprovalStatus.PENDING && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-800">
                  Your driver application is pending admin verification.
                </p>
                <p className="text-sm text-yellow-700">
                  Please wait for approval before you can start driving.
                </p>
              </div>
            </div>
          </div>
        )}

        {approvalStatus === DriverApprovalStatus.REJECTED && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-300 bg-red-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <p className="font-medium text-red-800">
                  Your driver application was rejected.
                </p>
                <p className="text-sm text-red-700">
                  Please review your information and try again.
                </p>
              </div>
            </div>
            <Button
              className="ml-4"
              variant="destructive"
              onClick={() => navigate("/driver/apply")}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Show driver application prompt if not registered */}
        {!isDriver && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-800">
                  You are not registered as a driver.
                </p>
                <p className="text-sm text-yellow-700">
                  Complete your application to start driving and earning.
                </p>
              </div>
            </div>
            <Button
              className="ml-4"
              variant="default"
              onClick={() => navigate("/driver/apply")}
            >
              Apply as Driver
            </Button>
          </div>
        )}

        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
            <Car className="text-primary-foreground h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {userInfo?.data?.userName}!
            </p>
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
        </div>

        <Overview />
      </main>
    </div>
  );
};

export default DriverDashboard;
