import { Router } from "express";

import { userController } from "./user.controller";

const userRoutes: Router = Router();

userRoutes.post("/", userController.createUser);

export default userRoutes;
