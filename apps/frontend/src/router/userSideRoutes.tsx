import Bookings from "@/pages/User/Bookings";
import UserAnalytics from "@/pages/User/UserAnalytics";

export const userSideRoutes = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/user/analytics",
        component: UserAnalytics,
      },
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
