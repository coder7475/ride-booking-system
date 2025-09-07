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
import { useRideDetailsQuery } from "@/redux/features/rider/rides.api";
import { useAppSelector } from "@/redux/hook";
import { getRideDetails } from "@/utils/getRideDetails";
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
  const { data, isLoading, isError } = useRideDetailsQuery(rideId);
  // address of lng,lat
  const addressCache = useAppSelector((state) => state.addressCache);

  // If loading, show loading dialog
  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex max-h-[90vh] max-w-2xl items-center justify-center overflow-y-auto">
          <span className="text-muted-foreground">Loading ride details...</span>
        </DialogContent>
      </Dialog>
    );
  }

  // If error or no data, show error dialog
  if (isError || !data || !data.data) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex max-h-[90vh] max-w-2xl items-center justify-center overflow-y-auto">
          <span className="text-destructive">Failed to load ride details.</span>
        </DialogContent>
      </Dialog>
    );
  }

  // Extract ride details from API response
  const {
    ride,
    // pickupKey,
    // destKey,
    // requestedAt,
    dateStr,
    timeStr,
    pickup,
    destination,
    // fareEstimated,
    // fareFinal,
    fareDisplay,
    status,
    timeline,
  } = getRideDetails(data.data, addressCache);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Ride Details
          </DialogTitle>
          <DialogDescription>Trip ID: {ride._id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{dateStr}</h3>
              <p className="text-muted-foreground">{timeStr}</p>
            </div>
            <Badge variant="secondary">{status}</Badge>
          </div>

          {/* Route Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium">Pickup Location</p>
                <p className="text-muted-foreground text-sm">{pickup}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-red-500"></div>
              <div>
                <p className="font-medium">Destination</p>
                <p className="text-muted-foreground text-sm">{destination}</p>
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
                    ?
                  </span>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">Not assigned</h5>
                  <div className="mb-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm">No rating</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    No car assigned
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
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
              <p className="font-semibold">--</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <MapPin className="text-primary mx-auto mb-1 h-5 w-5" />
              <p className="text-muted-foreground text-sm">Distance</p>
              <p className="font-semibold">--</p>
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
                <span className="text-muted-foreground">Estimated Fare</span>
                <span>
                  {typeof fareDisplay === "number" ? `৳${fareDisplay}` : "--"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">
                  {typeof fareDisplay === "number" ? `৳${fareDisplay}` : "--"}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Payment: {ride.transactionId ? "Pending" : "--"}
              </p>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-semibold">Trip Timeline</h4>
            <div className="space-y-3">
              {timeline.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No timeline available.
                </p>
              ) : (
                timeline.map(
                  (
                    event: { status?: string; event?: string; time?: string },
                    index: number,
                  ) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          event.status === "completed"
                            ? "bg-green-500"
                            : "bg-muted-foreground"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {event.event ?? "--"}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {event.time ?? "--"}
                        </p>
                      </div>
                    </div>
                  ),
                )
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" disabled>
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
