import AppError from "@/configs/AppError";
import { UserModel } from "@/modules/user/user.model";
import { AccountStatus } from "@/types/types";
import { verifyToken } from "@/utils/jwtHelpers";
import { NextFunction, Request, Response } from "express";

interface DecodedUser {
  id: string;
  email?: string;
  role: string;
}

export const checkAuth =
  (...allowedRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers?.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(403, "Unauthorized: No token provided");
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token!) as DecodedUser;
      const isUser = await UserModel.findOne({ email: decoded.email });

      if (!isUser) {
        throw new AppError(400, "User does not exits!");
      }

      if (isUser.accountStatus === AccountStatus.BLOCKED) {
        throw new AppError(403, "User is blocked!");
      }

      if (isUser.accountStatus === AccountStatus.SUSPENDED) {
        throw new AppError(403, "User is suspended!");
      }

      if (isUser.accountStatus === AccountStatus.DEACTIVATED) {
        throw new AppError(403, "User is deleted!");
      }

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
