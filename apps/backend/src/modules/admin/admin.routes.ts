import { checkAuth } from "@/middlewares/CheckAuth";
import { Role } from "@/types/types";
import { Router } from "express";

const adminRoutes: Router = Router();

// approve or reject driver application
adminRoutes.patch("/drivers/:id/approve", checkAuth(Role.ADMIN));
adminRoutes.patch("/drivers/:id/reject", checkAuth(Role.ADMIN));

export default adminRoutes;
