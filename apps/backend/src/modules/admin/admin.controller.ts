import AppError from "@/configs/AppError";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { NextFunction, Request, Response } from "express";

import { AdminServices } from "./admin.service";

const approveDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.params.id;

    if (!driverId) {
      throw new AppError(400, "Driver ID is required");
    }

    const updatedDriver = await AdminServices.approveDriver(driverId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Driver approved successfully",
      data: updatedDriver,
    });
  },
);

const rejectDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.params.id;

    if (!driverId) {
      throw new AppError(400, "Driver ID is required");
    }

    const updatedDriver = await AdminServices.rejectDriver(driverId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Driver rejected successfully",
      data: updatedDriver,
    });
  },
);

export const AdminController = {
  approveDriver,
  rejectDriver,
};
