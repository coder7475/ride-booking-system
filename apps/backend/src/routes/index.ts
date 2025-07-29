import userRoutes from "@/modules/user/users.routes";
import { Router } from "express";

const indexRouter: Router = Router();

const moduleRoutes = [
  {
    path: "/user",
    routes: userRoutes,
  },
];

moduleRoutes.forEach((route) => {
  indexRouter.use(route.path, route.routes);
});

export default indexRouter;
