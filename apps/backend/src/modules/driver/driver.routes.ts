import { checkAuth } from "@/middlewares/CheckAuth";
import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

import { DriversControllers } from "./driver.controller";
import { CreateDriverSchema, UpdateDriverSchema } from "./driver.schema";

const driverRoutes: Router = Router();

driverRoutes.post(
  "/apply",
  validateZod(CreateDriverSchema),
  checkAuth(Role.USER),
  DriversControllers.applyForDriver,
);

// Get Driver profile
driverRoutes.get(
  "/me",
  checkAuth(Role.DRIVER, Role.USER),
  DriversControllers.getMe,
);

// update availability status (Online/Offline)
driverRoutes.patch(
  "/me/status",
  validateZod(UpdateDriverSchema),
  checkAuth(Role.DRIVER),
  DriversControllers.updateOnlineStatus,
);

driverRoutes.get(
  "/me/earnings",
  checkAuth(Role.DRIVER),
  DriversControllers.getEarningHistory,
);

export default driverRoutes;
