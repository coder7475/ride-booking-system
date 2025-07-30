import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { NextFunction, Request, Response } from "express";

import { userService } from "../user/user.service";

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

export const AuthController = {
  registerUser,
};
