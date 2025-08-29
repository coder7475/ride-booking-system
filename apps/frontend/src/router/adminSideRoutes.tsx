import Analytics from "@/pages/Admin/Analytics";

export const adminSideRoutes = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Project Structure",
        url: "#",
      },
    ],
  },
  {
    title: "Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Analytics,
      },
      {
        title: "Project Structure",
        url: "#",
      },
    ],
  },
];
