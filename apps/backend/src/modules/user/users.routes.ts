import { Router } from "express";

import { userController } from "./user.controller";

const userRoutes: Router = Router();

userRoutes.patch("/me", userController.createUser);
userRoutes.delete("/me", userController.createUser);
userRoutes.get("/:id", userController.createUser);

export default userRoutes;
