import AppError from "@/configs/AppError";
import { catchAsync } from "@/utils/asyncHandler";
import { setAuthCookies } from "@/utils/cookieHelpers";
import sendResponse from "@/utils/sendResponse";
import type { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { UserServices } from "../user/user.service";
import { IResetPassword } from "./auth.interface";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: user,
    });
  },
);

const login = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const generatedTokens = await AuthServices.login(req.body);

    setAuthCookies(res, generatedTokens);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successful",
      data: {
        accessToken: generatedTokens.accessToken,
        refreshToken: generatedTokens.refreshToken,
      },
    });
  },
);

// Refresh token function
const reissueAccessToken = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "Refresh token required");
    }

    const refreshToken = authHeader.split(" ")[1];
    if (!refreshToken) {
      throw new AppError(401, "Refresh token not found");
    }

    const newAccessToken = await AuthServices.reissueAccessToken(refreshToken);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken: newAccessToken,
        refreshToken,
      },
    });
  },
);

// Logout endpoint
const logout = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    // Clear the refresh token cookie (if set)
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logged out successfully",
      data: null,
    });
  },
);

const forgetPassword = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const email = req.body.email;

    const result = await AuthServices.forgetPassword(email);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Reset Link generated successfully",
      data: result,
    });
  },
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userData: IResetPassword = req.body;
    const decodedUser: JwtPayload = req.user;

    const data = await AuthServices.resetPassword(userData, decodedUser);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password Reset successfully!",
      data,
    });
  },
);

export const AuthController = {
  registerUser,
  login,
  reissueAccessToken,
  logout,
  forgetPassword,
  resetPassword,
};
