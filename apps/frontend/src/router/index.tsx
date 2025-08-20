import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Assessment from "@/pages/User/Assessment";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "verify",
        Component: Verify,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      {
        path: "analytics",
        Component: Analytics,
      },
    ],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [
      {
        path: "assessment",
        Component: Assessment,
      },
    ],
  },
]);

export default router;
