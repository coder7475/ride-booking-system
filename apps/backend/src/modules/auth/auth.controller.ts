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

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login Successfully",
      data: generatedTokens,
    });
  },
);

export const AuthController = {
  registerUser,
  login,
};
