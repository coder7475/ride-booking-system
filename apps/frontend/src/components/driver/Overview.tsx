import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ActiveRideManagement from "@/pages/Driver/ActiveRideManagement";
import IncomingRequests from "@/pages/Driver/IncomingRequests";
import { TrendingUp } from "lucide-react";

const Overview = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <IncomingRequests />
        <ActiveRideManagement />
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Performance
          </CardTitle>
          <CardDescription>
            Your earnings and ride performance this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center">
                <div
                  className="bg-primary hover:bg-primary/80 mx-auto mb-2 rounded-lg transition-all duration-300"
                  style={{
                    height: `${Math.random() * 80 + 40}px`,
                    width: "100%",
                    maxWidth: "40px",
                  }}
                ></div>
                <p className="text-muted-foreground text-xs">{day}</p>
                <p className="text-xs font-medium">
                  ${Math.floor(Math.random() * 200 + 100)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Overview;
