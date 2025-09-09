import ActiveRideManagement from "@/pages/Driver/ActiveRideManagement";
import DriverDashboard from "@/pages/Driver/DriverDashboard";
import DriverRideHistory from "@/pages/Driver/DriverRideHistory";
import EarningsDashboard from "@/pages/Driver/EarningsDashboard";
import IncomingRequests from "@/pages/Driver/IncomingRequests";
import ProfileManagement from "@/pages/User/ProfileManagement";

export const driverSideRoutes = [
  {
    title: "Driver Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        component: DriverDashboard,
      },
      {
        title: "Incoming Requests",
        url: "/driver/incoming",
        component: IncomingRequests,
      },
      {
        title: "Active Rides",
        url: "/driver/active",
        component: ActiveRideManagement,
      },
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: EarningsDashboard,
      },
      {
        title: "History",
        url: "/driver/history",
        component: DriverRideHistory,
      },
      {
        title: "Profile Management",
        url: "/driver/profile",
        component: ProfileManagement,
      },
    ],
  },
];
