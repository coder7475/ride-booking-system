import { useState } from "react";
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
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Filter,
  MapPin,
  Search,
  Star,
} from "lucide-react";

const DriverRideHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const rides = [
    {
      id: 1,
      date: "2024-01-15",
      time: "2:30 PM",
      rider: "Sarah Johnson",
      from: "123 Main St, Downtown",
      to: "456 Oak Ave, Uptown",
      earnings: "$15.50",
      status: "completed",
      rating: 5,
      duration: "25 mins",
      distance: "3.2 miles",
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "6:45 PM",
      rider: "Michael Chen",
      from: "Airport Terminal 2",
      to: "Grand Hotel Central",
      earnings: "$28.75",
      status: "completed",
      rating: 4,
      duration: "35 mins",
      distance: "8.1 miles",
    },
    {
      id: 3,
      date: "2024-01-14",
      time: "10:20 AM",
      rider: "Emily Davis",
      from: "Shopping Mall",
      to: "University Campus",
      earnings: "$12.40",
      status: "completed",
      rating: 5,
      duration: "18 mins",
      distance: "2.8 miles",
    },
    {
      id: 4,
      date: "2024-01-13",
      time: "3:15 PM",
      rider: "Robert Wilson",
      from: "Business District",
      to: "Residential Area",
      earnings: "$0.00",
      status: "cancelled",
      rating: null,
      duration: null,
      distance: "4.5 miles",
    },
    {
      id: 5,
      date: "2024-01-12",
      time: "9:00 AM",
      rider: "Lisa Anderson",
      from: "Train Station",
      to: "City Center",
      earnings: "$18.20",
      status: "completed",
      rating: 4,
      duration: "28 mins",
      distance: "5.3 miles",
    },
  ];

  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.rider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ride.status === statusFilter;

    const matchesDate =
      !dateFilter || ride.date === format(dateFilter, "yyyy-MM-dd");

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalEarnings = rides
    .filter((ride) => ride.status === "completed")
    .reduce((sum, ride) => sum + parseFloat(ride.earnings.replace("$", "")), 0);

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Ride History
        </CardTitle>
        <CardDescription>Track your past rides and earnings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Earnings Summary */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Total Earnings</h4>
              <p className="text-muted-foreground text-sm">
                From completed rides
              </p>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${totalEarnings.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search riders or locations..."
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
          {paginatedRides.map((ride) => (
            <div
              key={ride.id}
              className="border-border hover:bg-muted/50 rounded-lg border p-4 transition-colors"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-medium">{ride.date}</span>
                    <span className="text-muted-foreground text-sm">
                      {ride.time}
                    </span>
                    {getStatusBadge(ride.status)}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span className="font-medium">Rider:</span>
                    <span>{ride.rider}</span>
                    {ride.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span className="text-xs">{ride.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {ride.earnings}
                  </div>
                  {ride.duration && (
                    <div className="text-muted-foreground text-sm">
                      {ride.duration}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Pickup</div>
                    <div className="text-muted-foreground text-sm">
                      {ride.from}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
                  <div>
                    <div className="text-sm font-medium">Destination</div>
                    <div className="text-muted-foreground text-sm">
                      {ride.to}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-border mt-3 flex items-center justify-between border-t pt-3">
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {ride.distance}
                  </div>
                  {ride.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ride.duration}
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
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

export default DriverRideHistory;
