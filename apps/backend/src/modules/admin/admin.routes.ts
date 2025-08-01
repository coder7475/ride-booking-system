import { checkAuth } from "@/middlewares/CheckAuth";
import { Role } from "@/types/types";
import { Router } from "express";

import { AdminController } from "./admin.controller";

const adminRoutes: Router = Router();

// approve or reject driver application
adminRoutes.patch(
  "/drivers/:id/approve",
  checkAuth(Role.ADMIN),
  AdminController.approveDriver,
);

adminRoutes.patch(
  "/drivers/:id/reject",
  checkAuth(Role.ADMIN),
  AdminController.rejectDriver,
);

export default adminRoutes;
