import { catchAsync } from "@/utils/asyncHandler";
import { NextFunction, Request, Response } from "express";

import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await UserServices.createUser(userData);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const user = await UserServices.findUserById(userId);

    res.status(200).json({
      success: true,
      message: "Your profile retrieved successfully",
      data: user,
    });
  },
);

const getPublicProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User ID is required",
      });
      return;
    }

    const user = await UserServices.findUserById(userId);

    const publicProfile = user
      ? {
          name: user.user_name,
          email: user.email,
        }
      : null;

    res.status(200).json({
      success: true,
      message: "Public Profile retrieved successfully",
      data: publicProfile,
    });
  },
);

export const userController = {
  createUser,
  getMe,
  getPublicProfile,
};
