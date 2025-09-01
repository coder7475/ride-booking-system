import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, DollarSign, MapPin } from "lucide-react";

const RideRequestForm = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedFare, setEstimatedFare] = useState("$12.50");

  // TODO: Update estimate
  const handleEstimate = () => {
    // Dummy fare estimation
    const fares = ["$8.25", "$12.50", "$15.75", "$22.00"];

    setEstimatedFare(fares[Math.floor(Math.random() * fares.length)]);
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Request a Ride
        </CardTitle>
        <CardDescription>Book your ride in just a few steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup">Pickup Location</Label>
          <Input
            id="pickup"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Vehicle Type</Label>
          <Select defaultValue="economy">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy - $</SelectItem>
              <SelectItem value="comfort">Comfort - $$</SelectItem>
              <SelectItem value="premium">Premium - $$$</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select defaultValue="card">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Credit Card •••• 4242</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {pickup && destination && (
          <div className="bg-muted space-y-2 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Estimated Fare
              </span>
              <span className="text-primary font-semibold">
                {estimatedFare}
              </span>
            </div>
            <div className="text-muted-foreground flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Estimated Time
              </span>
              <span>15-20 mins</span>
            </div>
            <Button
              onClick={handleEstimate}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Update Estimate
            </Button>
          </div>
        )}

        <Button className="w-full" disabled={!pickup || !destination}>
          Book Ride
        </Button>
      </CardContent>
    </Card>
  );
};

export default RideRequestForm;
