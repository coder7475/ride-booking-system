import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { NextFunction, Request, Response } from "express";

import { userService } from "../user/user.service";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User Created Successfully",
      data: user,
    });
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const generatedTokens = await AuthServices.login(req.body);

    // Set the tokens in cookies
    res.cookie("accessToken", generatedTokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.cookie("refreshToken", generatedTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login Successfully",
      data: null,
    });
  },
);

const reissueAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      sendResponse(res, {
        success: false,
        statusCode: 401,
        message: "Refresh token missing or invalid",
        data: null,
      });
    }

    const refreshToken = authHeader?.split(" ")[1];

    const newAccessToken = await AuthServices.reissueAccessToken(refreshToken!);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "New Access Token Issued!",
      data: {
        accessToken: newAccessToken,
        refreshToken,
      },
    });
  },
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Clear the refresh token cookie (if set)
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    // Clear the refresh token cookie (if set)
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Logged out successfully",
      data: null,
    });
  },
);

export const AuthController = {
  registerUser,
  login,
  reissueAccessToken,
  logout,
};
