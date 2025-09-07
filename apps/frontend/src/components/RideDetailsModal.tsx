import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Clock,
  CreditCard,
  Download,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

interface RideDetailsModalProps {
  rideId: string;
  isOpen: boolean;
  onClose: () => void;
}

const RideDetailsModal = ({
  rideId,
  isOpen,
  onClose,
}: RideDetailsModalProps) => {
  console.log(rideId);
  const rideDetails = {
    id: "RID-12345",
    date: "January 15, 2024",
    time: "2:30 PM",
    from: "123 Main St, Downtown",
    to: "456 Office Plaza, Business District",
    driver: {
      name: "John Smith",
      rating: 4.8,
      car: "Toyota Camry",
      license: "ABC-123",
      phone: "+1-234-567-8900",
    },
    status: "completed",
    duration: "25 mins",
    distance: "8.5 km",
    cost: {
      base: "$5.00",
      distance: "$6.50",
      time: "$1.00",
      total: "$12.50",
    },
    payment: "Credit Card •••• 4242",
    timeline: [
      { time: "2:30 PM", event: "Ride requested", status: "completed" },
      { time: "2:32 PM", event: "Driver assigned", status: "completed" },
      { time: "2:38 PM", event: "Driver arrived", status: "completed" },
      { time: "2:40 PM", event: "Trip started", status: "completed" },
      { time: "3:05 PM", event: "Trip completed", status: "completed" },
    ],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Ride Details
          </DialogTitle>
          <DialogDescription>Trip ID: {rideDetails.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{rideDetails.date}</h3>
              <p className="text-muted-foreground">{rideDetails.time}</p>
            </div>
            <Badge variant="secondary">{rideDetails.status}</Badge>
          </div>

          {/* Mock Map */}
          <div className="bg-muted flex h-48 items-center justify-center rounded-lg">
            <div className="text-center">
              <MapPin className="text-primary mx-auto mb-2 h-12 w-12" />
              <p className="text-muted-foreground text-sm">Route Map</p>
              <p className="text-muted-foreground text-xs">
                Pickup to destination path
              </p>
            </div>
          </div>

          {/* Route Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium">Pickup Location</p>
                <p className="text-muted-foreground text-sm">
                  {rideDetails.from}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-red-500"></div>
              <div>
                <p className="font-medium">Destination</p>
                <p className="text-muted-foreground text-sm">
                  {rideDetails.to}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Driver Information */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-semibold">
              <Car className="h-4 w-4" />
              Driver Information
            </h4>
            <div className="border-border rounded-lg border p-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-primary-foreground font-semibold">
                    JS
                  </span>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">{rideDetails.driver.name}</h5>
                  <div className="mb-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm">
                      {rideDetails.driver.rating} rating
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {rideDetails.driver.car} • {rideDetails.driver.license}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Trip Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3 text-center">
              <Clock className="text-primary mx-auto mb-1 h-5 w-5" />
              <p className="text-muted-foreground text-sm">Duration</p>
              <p className="font-semibold">{rideDetails.duration}</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <MapPin className="text-primary mx-auto mb-1 h-5 w-5" />
              <p className="text-muted-foreground text-sm">Distance</p>
              <p className="font-semibold">{rideDetails.distance}</p>
            </div>
          </div>

          <Separator />

          {/* Fare Breakdown */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-semibold">
              <CreditCard className="h-4 w-4" />
              Fare Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base fare</span>
                <span>{rideDetails.cost.base}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Distance ({rideDetails.distance})
                </span>
                <span>{rideDetails.cost.distance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Time ({rideDetails.duration})
                </span>
                <span>{rideDetails.cost.time}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">{rideDetails.cost.total}</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Paid via {rideDetails.payment}
              </p>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-semibold">Trip Timeline</h4>
            <div className="space-y-3">
              {rideDetails.timeline.map((event, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      event.status === "completed"
                        ? "bg-green-500"
                        : "bg-muted-foreground"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.event}</p>
                    <p className="text-muted-foreground text-xs">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1">
              Report Issue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RideDetailsModal;
