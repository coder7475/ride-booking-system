import adminRoutes from "@/modules/admin/admin.routes";
import authRoutes from "@/modules/auth/auth.routes";
import driverRoutes from "@/modules/driver/driver.routes";
import otpRoutes from "@/modules/otp/otp.route";
import RidesRouter from "@/modules/ride/ride.routes";
import transactionsRouter from "@/modules/transaction/transaction.routes";
import userRoutes from "@/modules/user/user.routes";
import { Router } from "express";

const indexRouter: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/user",
    routes: userRoutes,
  },
  {
    path: "/otp",
    routes: otpRoutes,
  },
  {
    path: "/drivers",
    routes: driverRoutes,
  },
  {
    path: "/rides",
    routes: RidesRouter,
  },
  {
    path: "/admin",
    routes: adminRoutes,
  },
  {
    path: "/transactions",
    routes: transactionsRouter,
  },
];

moduleRoutes.forEach((route) => {
  indexRouter.use(route.path, route.routes);
});

export default indexRouter;
