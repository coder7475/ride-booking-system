import authRoutes from "@/modules/auth/auth.routes";
import driverRoutes from "@/modules/driver/driver.routes";
import RidesRouter from "@/modules/ride/ride.routes";
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
    path: "/drivers",
    routes: driverRoutes,
  },
  {
    path: "/rides",
    routes: RidesRouter,
  },
];

moduleRoutes.forEach((route) => {
  indexRouter.use(route.path, route.routes);
});

export default indexRouter;
