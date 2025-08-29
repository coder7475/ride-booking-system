import Analytics from "@/pages/Admin/Analytics";
import DriverApprovals from "@/pages/Admin/DriverApprovals";

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
        title: "Driver Approvals",
        url: "/admin/driver-approvals",
        component: DriverApprovals,
      },
    ],
  },
];
