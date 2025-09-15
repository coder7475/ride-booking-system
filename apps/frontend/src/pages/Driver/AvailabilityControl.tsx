// import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
// import { useUpdateDriverStatusMutation } from "@/redux/features/driver/driver.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setOnlineStatus } from "@/redux/slices/driverSlice";
import { DriverOnlineStatus } from "@/types/driver.types";
import { Car, Clock, DollarSign } from "lucide-react";

const AvailabilityControl = ({ isOnline }) => {
  const dispatch = useAppDispatch();
  // const [updateDriverStatus] = useUpdateDriverStatusMutation();

  // Get online status directly from redux store
  const stats = {
    hoursOnline: "4.5",
    earnings: "$125.80",
    completedRides: 8,
  };

  // When online status changes, update backend

  // Handler for switch toggle
  const handleToggle = (checked: boolean) => {
    dispatch(
      setOnlineStatus(
        checked ? DriverOnlineStatus.ONLINE : DriverOnlineStatus.OFFLINE,
      ),
    );

    // updateDriverStatus({
    //   onlineStatus: isOnline
    //     ? DriverOnlineStatus.ONLINE
    //     : DriverOnlineStatus.OFFLINE,
    // });
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Driver Status
        </CardTitle>
        <CardDescription>
          Control your availability to receive ride requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Toggle */}
        <div className="border-border flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="font-medium">Availability Status</h3>
            <p className="text-muted-foreground text-sm">
              {isOnline
                ? "You're online and can receive ride requests"
                : "You're offline and won't receive ride requests"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isOnline ? "secondary" : "outline"}>
              {isOnline ? "Online" : "Offline"}
            </Badge>
            <Switch
              checked={isOnline}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border-border rounded-lg border p-4 text-center">
            <Clock className="text-primary mx-auto mb-2 h-8 w-8" />
            <div className="text-2xl font-bold">{stats.hoursOnline}h</div>
            <div className="text-muted-foreground text-sm">Hours Online</div>
          </div>

          <div className="border-border rounded-lg border p-4 text-center">
            <DollarSign className="mx-auto mb-2 h-8 w-8 text-green-500" />
            <div className="text-2xl font-bold">{stats.earnings}</div>
            <div className="text-muted-foreground text-sm">
              Today's Earnings
            </div>
          </div>

          <div className="border-border rounded-lg border p-4 text-center">
            <Car className="mx-auto mb-2 h-8 w-8 text-blue-500" />
            <div className="text-2xl font-bold">{stats.completedRides}</div>
            <div className="text-muted-foreground text-sm">Completed Rides</div>
          </div>
        </div>

        {/* Status Message */}
        {isOnline && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <p className="text-sm text-green-800 dark:text-green-200">
              🚗 You're now online! Ride requests will appear in the Incoming
              Requests tab.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityControl;
