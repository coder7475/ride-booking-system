import { Role } from "@/types/types";
import { Router } from "express";

import { checkAuth } from "./../../middlewares/CheckAuth";
import { userController } from "./user.controller";

const userRoutes: Router = Router();

userRoutes.get("/me", checkAuth(...Object.values(Role)), userController.getMe);

userRoutes.patch("/me", userController.createUser);
userRoutes.delete("/me", userController.createUser);

userRoutes.get("/:id", userController.getPublicProfile);

export default userRoutes;
