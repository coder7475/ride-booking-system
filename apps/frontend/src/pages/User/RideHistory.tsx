import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRideHistoryQuery } from "@/redux/features/rider/rides.api";
import type { IRide } from "@/types/ride.types";
import { fetchAddress } from "@/utils/fetchAddress";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Filter,
  MapPin,
  Search,
} from "lucide-react";

const RideHistory = () => {
  const rideHistoryResult = useRideHistoryQuery(undefined);
  const rideHistory: IRide[] = rideHistoryResult?.data?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const [addressCache, setAddressCache] = useState<Record<string, string>>({});
  const itemsPerPage = 5;

  // Fetch human-readable addresses for pickup/destination
  useEffect(() => {
    if (rideHistory.length > 0) {
      const fetchAllAddresses = async () => {
        for (const ride of rideHistory) {
          const pickupKey = `${ride.pickupLocation.latitude},${ride.pickupLocation.longitude}`;
          const destKey = `${ride.destinationLocation.latitude},${ride.destinationLocation.longitude}`;

          // Only fetch if not cached
          if (!addressCache[pickupKey]) {
            const addr = await fetchAddress(
              ride.pickupLocation.latitude,
              ride.pickupLocation.longitude,
            );
            setAddressCache((prev) => ({
              ...prev,
              [pickupKey]: addr ?? pickupKey,
            }));
          }

          if (!addressCache[destKey]) {
            const addr = await fetchAddress(
              ride.destinationLocation.latitude,
              ride.destinationLocation.longitude,
            );
            setAddressCache((prev) => ({
              ...prev,
              [destKey]: addr ?? destKey,
            }));
          }
        }
      };

      fetchAllAddresses();
    }
  }, [rideHistory, addressCache]);

  const filteredRides = rideHistory.filter((ride: IRide) => {
    const pickupKey = `${ride?.pickupLocation?.latitude},${ride?.pickupLocation.longitude}`;
    const destKey = `${ride?.destinationLocation?.latitude},${ride?.destinationLocation.longitude}`;
    const pickup = addressCache[pickupKey] ?? pickupKey;
    const destination = addressCache[destKey] ?? destKey;
    const driver = ride.driverId ?? "Unassigned";

    const matchesSearch =
      pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ride.rideStatus.toLowerCase() === statusFilter;

    const matchesDate =
      !dateFilter ||
      format(new Date(ride.timestamps?.requested ?? ""), "yyyy-MM-dd") ===
        format(dateFilter, "yyyy-MM-dd");

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Ride History
        </CardTitle>
        <CardDescription>Track and manage your past rides</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search locations or drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rides</SelectItem>
              <SelectItem value="requested">Requested</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Ride List */}
        <div className="space-y-3">
          {paginatedRides?.map((ride: IRide) => {
            const pickupKey = `${ride.pickupLocation.latitude},${ride.pickupLocation.longitude}`;
            const destKey = `${ride.destinationLocation.latitude},${ride.destinationLocation.longitude}`;
            const pickup = addressCache[pickupKey] ?? pickupKey;
            const destination = addressCache[destKey] ?? destKey;

            return (
              <div
                key={ride._id}
                className="border-border hover:bg-muted/50 rounded-lg border p-4 transition-colors"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium">
                        {format(
                          new Date(ride?.timestamps?.requested ?? ""),
                          "PPP",
                        )}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {format(
                          new Date(ride.timestamps?.requested ?? ""),
                          "p",
                        )}
                      </span>
                      {getStatusBadge(ride.rideStatus)}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {pickup} → {destination}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold">
                      $
                      {ride.fareFinal > 0 ? ride.fareFinal : ride.fareEstimated}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      Driver:
                    </span>
                    <span className="text-sm font-medium">
                      {ride.driverId ?? "Unassigned"}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center px-3 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}

        {filteredRides.length === 0 && (
          <div className="py-8 text-center">
            <Clock className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">
              No rides found matching your criteria
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RideHistory;
