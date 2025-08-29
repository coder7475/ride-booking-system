import DriverAnalytics from "@/pages/Driver/DriverAnalytics";
import RidePickup from "@/pages/Driver/RidePickup";

export const driverSideRoutes = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        component: DriverAnalytics,
      },
      {
        title: "Bookings",
        url: "/driver/rides",
        component: RidePickup,
      },
    ],
  },
];
