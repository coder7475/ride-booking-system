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

  const isDriver = await DriverModel.findOne({
    userId: decoded.id,
  });
  if (!isDriver) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Driver not found",
      data: null,
    });
  }

  const updateStatus = req.body;

  // Only accept onlineStatus in the request body
  if (
    !("onlineStatus" in updateStatus) ||
    Object.keys(updateStatus).length !== 1
  ) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Only onlineStatus is accepted in the request body",
      data: null,
    });
  }

  const data = await DriverServices.updateDriverStatus(
    isDriver.id,
    updateStatus,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Driver status updated successfully",
    data,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const driver = await DriverServices.findDriverByUserId(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your driver profile retrieved successfully",
    data: driver,
  });
});

const getEarningHistory = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const driver = await DriverServices.findDriverByUserId(userId);
  console.log(driver);
  if (!driver) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Driver not found",
      data: null,
    });
  }

  const earnings = await DriverServices.earningHistory(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Earning history retrieved successfully",
    data: earnings,
  });
};

export const DriversControllers = {
  applyForDriver,
  updateOnlineStatus,
  getMe,
  getEarningHistory,
};
