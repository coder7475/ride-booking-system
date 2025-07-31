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
  checkAuth(...Object.values(Role)),
  DriversControllers.applyForDriver,
);

driverRoutes.patch(
  "/me/status",
  validateZod(UpdateDriverSchema),
  checkAuth(...Object.values(Role)),
  DriversControllers.updateOnlineStatus,
);
// router.get("/:id", getDriverById);
// router.put("/:id", validate(UpdateDriverSchema), updateDriver);
// router.delete("/:id", deleteDriver);

export default driverRoutes;
