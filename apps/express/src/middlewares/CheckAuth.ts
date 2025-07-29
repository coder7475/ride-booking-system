import AppError from "@/configs/AppError";
import { verifyToken } from "@/utils/jwtHelpers";
import { NextFunction, Request, Response } from "express";

interface DecodedUser {
  id: string;
  role: string;
  email?: string;
}

export const checkAuth =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers?.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(403, "Unauthorized: No token provided");
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token!) as DecodedUser;

      if (
        !decoded?.role ||
        (allowedRoles.length && !allowedRoles.includes(decoded.role))
      ) {
        throw new AppError(
          403,
          "Forbidden: You do not have access to this resource",
        );
      }

      req.user = decoded;

      next();
    } catch (error) {
      console.error("Auth Error:", error);
      next(error);
    }
  };
