import LiveRideTracking from "@/pages/User/LiveRideTracking";
import ProfileManagement from "@/pages/User/ProfileManagement";
import RideHistory from "@/pages/User/RideHistory";
import RiderDashboard from "@/pages/User/RiderDashboard";
import RideRequestForm from "@/pages/User/RideRequestForm";

export const userSideRoutes = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/analytics",
        component: RiderDashboard,
      },
      {
        title: "Ride Request",
        url: "/user/booking",
        component: RideRequestForm,
      },
      {
        title: "Live Tracking",
        url: "/user/live-tracking",
        component: LiveRideTracking,
      },
      {
        title: "Ride History",
        url: "/user/history",
        component: RideHistory,
      },
      {
        title: "Profile Management",
        url: "/user/profile",
        component: ProfileManagement,
      },
    ],
  },
];
