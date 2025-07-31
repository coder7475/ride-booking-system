import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

import { checkAuth } from "./../../middlewares/CheckAuth";
import { userController } from "./user.controller";
import { UpdateUserSchema } from "./user.schema";

const userRoutes: Router = Router();

userRoutes.get("/me", checkAuth(...Object.values(Role)), userController.getMe);

userRoutes.patch(
  "/me",
  validateZod(UpdateUserSchema),
  checkAuth(...Object.values(Role)),
  userController.updateUser,
);

userRoutes.delete(
  "/me",
  checkAuth(...Object.values(Role)),
  userController.deleteUser,
);

userRoutes.get("/:id", userController.getPublicProfile);

export default userRoutes;
