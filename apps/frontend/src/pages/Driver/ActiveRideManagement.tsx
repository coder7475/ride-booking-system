import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, MapPin, Navigation, Phone, User } from "lucide-react";
import { toast } from "sonner";

const ActiveRideManagement = () => {
  const [activeRide, setActiveRide] = useState({
    id: 1,
    rider: "Sarah Johnson",
    riderPhone: "+1-234-567-8900",
    pickup: "123 Main St, Downtown",
    destination: "456 Oak Ave, Uptown",
    fare: "$15.50",
    status: "accepted", // accepted, picked_up, in_transit, completed, cancelled
    startTime: "2:30 PM",
    estimatedArrival: "2:55 PM",
  });

  const statusSteps = [
    { key: "accepted", label: "Accepted", icon: CheckCircle },
    { key: "picked_up", label: "Picked Up", icon: User },
    { key: "in_transit", label: "In Transit", icon: Navigation },
    { key: "completed", label: "Completed", icon: CheckCircle },
  ];

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  const getNextStatus = () => {
    const currentIndex = getStatusIndex(activeRide.status);
    if (currentIndex < statusSteps.length - 1) {
      return statusSteps[currentIndex + 1].key;
    }
    return null;
  };

  const getNextStatusLabel = () => {
    const nextStatus = getNextStatus();
    if (!nextStatus) return null;
    return statusSteps.find((step) => step.key === nextStatus)?.label;
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus();
    if (!nextStatus) return;

    setActiveRide((prev) => ({ ...prev, status: nextStatus }));

    toast.success("Status Updated");

    if (nextStatus === "completed") {
      setTimeout(() => {
        toast.success("Ride Completed");
      }, 2000);
    }
  };

  const handleCancelRide = () => {
    setActiveRide((prev) => ({ ...prev, status: "cancelled" }));
    toast.error("Ride Cancelled");

    // setTimeout(() => {
    //   setActiveRide();
    // }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge variant="outline">Accepted</Badge>;
      case "picked_up":
        return <Badge className="bg-blue-500">Picked Up</Badge>;
      case "in_transit":
        return <Badge className="bg-green-500">In Transit</Badge>;
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!activeRide) {
    return (
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Active Ride
          </CardTitle>
          <CardDescription>Manage your current active ride</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Navigation className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">
              No active ride at the moment
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Accept a ride request to start managing an active trip
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Active Ride
        </CardTitle>
        <CardDescription>Manage your current active ride</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ride Status */}
        <div className="bg-muted/50 flex items-center justify-between rounded-lg p-4">
          <div>
            <h3 className="font-medium">Current Status</h3>
            <p className="text-muted-foreground text-sm">
              Ride started at {activeRide.startTime}
            </p>
          </div>
          {getStatusBadge(activeRide.status)}
        </div>

        {/* Status Timeline */}
        <div className="space-y-3">
          <h4 className="font-medium">Ride Progress</h4>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const currentIndex = getStatusIndex(activeRide.status);
              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <div
                  key={step.key}
                  className="flex flex-1 flex-col items-center"
                >
                  <div
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full ${isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} ${isCurrent ? "ring-primary ring-2 ring-offset-2" : ""} `}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`text-center text-xs ${isCompleted ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </span>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute mt-4 h-0.5 w-16 ${isCompleted ? "bg-primary" : "bg-muted"}`}
                      style={{
                        left: `${(index + 1) * 25}%`,
                        transform: "translateX(-50%)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rider Information */}
        <div className="space-y-4">
          <h4 className="font-medium">Rider Information</h4>
          <div className="border-border flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4" />
              <span className="font-medium">{activeRide.rider}</span>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              Call Rider
            </Button>
          </div>
        </div>

        {/* Route Information */}
        <div className="space-y-3">
          <h4 className="font-medium">Route Details</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">Pickup Location</div>
                <div className="text-muted-foreground text-sm">
                  {activeRide.pickup}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
              <div>
                <div className="text-sm font-medium">Destination</div>
                <div className="text-muted-foreground text-sm">
                  {activeRide.destination}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Information */}
        <div className="border-border rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Ride Fare</span>
            <span className="text-primary text-lg font-semibold">
              {activeRide.fare}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {activeRide.status !== "completed" &&
          activeRide.status !== "cancelled" && (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={handleCancelRide}
              >
                Cancel Ride
              </Button>
              {getNextStatus() && (
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={handleStatusUpdate}
                >
                  Mark as {getNextStatusLabel()}
                </Button>
              )}
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default ActiveRideManagement;
