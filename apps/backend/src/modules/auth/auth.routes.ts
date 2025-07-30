import { Router } from "express";

const authRoutes: Router = Router();

authRoutes.post("/register", (_req, res) => {
  return res.status(200).json({
    message: "/api/v1/auth/register",
  });
});

authRoutes.post("/login", (_req, res) => {
  return res.status(200).json({
    message: "/api/v1/auth/login",
  });
});

authRoutes.post("/refresh-token", (_req, res) => {
  return res.status(200).json({
    message: "/api/v1/auth/refresh-token",
  });
});

authRoutes.post("/logout", (_req, res) => {
  return res.status(200).json({
    message: "/api/v1/auth/refresh-token",
  });
});

export default authRoutes;
