import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { Request, Response } from "express";

import { DriverModel } from "./driver.model";
import { DriverServices } from "./driver.service";

const applyForDriver = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const driverData = {
    ...req.body,
    userId,
  };
  const data = await DriverServices.createDriver(driverData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Driver application submitted successfully",
    data,
  });
});

const updateOnlineStatus = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user;
  const isDriver = await DriverModel.findById(decoded.id);
  if (!isDriver) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Driver not found",
      data: null,
    });
  }

  const updateStatus = req.body;

  const data = await DriverServices.updateDriverStatus(
    decoded.id,
    updateStatus,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Driver status updated successfully",
    data,
  });
});

export const DriversControllers = {
  applyForDriver,
  updateOnlineStatus,
};
