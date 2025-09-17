import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  useDriverProfileQuery,
  useUpdateDriverStatusMutation,
} from "@/redux/features/driver/driver.api";
import { ridesApi } from "@/redux/features/rider/rides.api";
import { useAppDispatch } from "@/redux/hook";
import { DriverOnlineStatus } from "@/types/driver.types";
import { Car, Clock, DollarSign } from "lucide-react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

// Fallback stats in case data is not available
const fallbackStats = {
  hoursOnline: "0.0",
  earnings: "$0.00",
  completedRides: 0,
};

const AvailabilityControl = () => {
  const [updateDriverStatus] = useUpdateDriverStatusMutation();
  const {
    data: driverProfile,
    isLoading: isProfileLoading,
    isError,
  } = useDriverProfileQuery(undefined);

  // Use stats from profile if available, else fallback
  const stats = driverProfile?.data?.stats
    ? {
        hoursOnline:
          driverProfile.data.stats.hoursOnline ?? fallbackStats.hoursOnline,
        earnings: driverProfile.data.stats.earnings ?? fallbackStats.earnings,
        completedRides:
          driverProfile.data.stats.completedRides ??
          fallbackStats.completedRides,
      }
    : fallbackStats;

  const [cookie, setCookie] = useCookies(["driverOnlineStatus"]);
  const [online, setOnline] = useState(() => {
    return cookie.driverOnlineStatus === true;
  });
  // const dispatch = useAppDispatch();
  const handleToggle = async (checked: boolean) => {
    setOnline(!online);
    setCookie("driverOnlineStatus", !online);

    // if (!checked) {
    //   dispatch(ridesApi.util.resetApiState());
    // }
    try {
      await updateDriverStatus({
        onlineStatus: checked
          ? DriverOnlineStatus.ONLINE
          : DriverOnlineStatus.OFFLINE,
      }).unwrap();
    } catch (error: unknown) {
      console.error(error);
      toast.success("Failed to update Online Status!");
    }
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
              {isProfileLoading
                ? "Loading status..."
                : online
                  ? "You're online and can receive ride requests"
                  : "You're offline and won't receive ride requests"}
            </p>
            {isError && (
              <p className="mt-1 text-xs text-red-500">
                Failed to load driver status.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={online ? "secondary" : "outline"}>
              {online ? "Online" : "Offline"}
            </Badge>
            <Switch
              checked={online}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-green-500"
              // disabled={isProfileLoading || isUpdating}
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
      </CardContent>
    </Card>
  );
};

export default AvailabilityControl;
