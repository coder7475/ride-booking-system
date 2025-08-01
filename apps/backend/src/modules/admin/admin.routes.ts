import { checkAuth } from "@/middlewares/CheckAuth";
import { Role } from "@/types/types";
import { Router } from "express";

import { AdminController } from "./admin.controller";

const adminRoutes: Router = Router();

// List all users
adminRoutes.get("/users", checkAuth(Role.ADMIN), AdminController.getUsers);

// List all drivers
adminRoutes.get("/drivers", checkAuth(Role.ADMIN), AdminController.getDrivers);

// List all rides
adminRoutes.get("/rides", checkAuth(Role.ADMIN), AdminController.getRides);

// Get a single user's data
adminRoutes.get(
  "/users/:id",
  checkAuth(Role.ADMIN),
  AdminController.getUserById,
);

// Block user account
adminRoutes.patch(
  "/users/:id/block",
  checkAuth(Role.ADMIN),
  AdminController.blockUser,
);

// Unblock user account
adminRoutes.patch(
  "/users/:id/unblock",
  checkAuth(Role.ADMIN),
  AdminController.unblockUser,
);

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
