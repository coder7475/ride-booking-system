import { validateZod } from "@/middlewares/ValidateRequest";
import { Router } from "express";

import { CreateUserSchema } from "../user/user.schema";
import { AuthController } from "./auth.controller";
import { LoginSchema } from "./auth.schema";

const authRoutes: Router = Router();

authRoutes.post(
  "/register",
  validateZod(CreateUserSchema),
  AuthController.registerUser,
);

authRoutes.post("/login", validateZod(LoginSchema), AuthController.login);

authRoutes.post("/refresh-token", AuthController.reissueAccessToken);

authRoutes.post("/logout", (_req, res) => {
  return res.status(200).json({
    message: "/api/v1/auth/refresh-token",
  });
});

export default authRoutes;
