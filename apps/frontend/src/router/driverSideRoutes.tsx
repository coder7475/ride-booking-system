import DriverDashboard from "@/pages/Driver/DriverDashboard";
import RidePickup from "@/pages/Driver/RidePickup";

export const driverSideRoutes = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        component: DriverDashboard,
      },
      {
        title: "Bookings",
        url: "/driver/rides",
        component: RidePickup,
      },
    ],
  },
];
