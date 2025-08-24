import { checkAuth } from "@/middlewares/CheckAuth";
import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

import { CreateUserSchema } from "../user/user.schema";
import { AuthController } from "./auth.controller";
import {
  forgetPasswordSchema,
  LoginSchema,
  resetPasswordSchema,
} from "./auth.schema";

const authRoutes: Router = Router();

authRoutes.post(
  "/register",
  validateZod(CreateUserSchema),
  AuthController.registerUser,
);

authRoutes.post("/login", validateZod(LoginSchema), AuthController.login);

authRoutes.post("/refresh-token", AuthController.reissueAccessToken);

authRoutes.post("/logout", AuthController.logout);

authRoutes.post(
  "/forget-password",
  validateZod(forgetPasswordSchema),
  AuthController.forgetPassword,
);

authRoutes.post(
  "/reset-password",
  validateZod(resetPasswordSchema),
  checkAuth(...Object.values(Role)),
  AuthController.resetPassword,
);

export default authRoutes;
