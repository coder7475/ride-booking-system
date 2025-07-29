import type { Request, Response } from "express";
import { Router } from "express";

import { userController } from "./user.controller";

const userRoutes: Router = Router();

//** root:  api/v1/user
userRoutes.get("/", (_req: Request, res: Response) => {
  res.json({
    status: 200,
    message: "This is user register route",
  });
});

userRoutes.post("/", userController.createUser);

export default userRoutes;
