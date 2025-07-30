import { catchAsync } from "@/utils/asyncHandler";
import { NextFunction, Request, Response } from "express";

import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await userService.createUser(userData);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const userController = {
  createUser,
};
