import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { About, Blogs } from "@/pages/Public";
import FAQ from "@/pages/Public/FAQ";
import Features from "@/pages/Public/Features";
import Careers from "@/pages/Public/FooterPages/Careers";
import Contact from "@/pages/Public/FooterPages/Contact";
import HelpCenter from "@/pages/Public/FooterPages/HelpCenter";
import Press from "@/pages/Public/FooterPages/Press";
import Safety from "@/pages/Public/FooterPages/Safety";
import NotFound from "@/pages/Public/NotFound";
import Privacy from "@/pages/Public/Privacy";
import Terms from "@/pages/Public/Terms";
import Verify from "@/pages/Public/Verify";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";

import { adminSideRoutes } from "./adminSideRoutes";
import { driverSideRoutes } from "./driverSideRoutes";
import { userSideRoutes } from "./userSideRoutes";

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
        path: "features",
        Component: Features,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: "contact",
        Component: Contact,
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
        path: "terms",
        Component: Terms,
      },
      {
        path: "privacy",
        Component: Privacy,
      },
      {
        path: "careers",
        Component: Careers,
      },
      {
        path: "safety",
        Component: Safety,
      },
      {
        path: "/blogs",
        Component: Blogs,
      },
      {
        path: "help",
        Component: HelpCenter,
      },
      {
        path: "press",
        Component: Press,
      },
      {
        path: "blog",
        Component: Blogs,
      },
      {
        path: "verify",
        Component: Verify,
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSideRoutes)],
  },
  {
    Component: DashboardLayout,
    path: "/driver",
    children: [...generateRoutes(driverSideRoutes)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [...generateRoutes(userSideRoutes)],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
