import AppError from "@/configs/AppError";
import { DriverApprovalStatus, Role } from "@/types/types";

import { DriverModel } from "../driver/driver.model";
import { UserModel } from "../user/user.model";

const approveDriver = async (driverId: string) => {
  const mongoose = require("mongoose");
  const session = await mongoose.startSession();

  try {
    if (!driverId) {
      throw new AppError(400, "Driver ID is required.");
    }

    session.startTransaction();

    const driver = await DriverModel.findById(driverId).session(session);

    if (!driver) {
      throw new AppError(404, "Driver NOT Found!");
    }

    if (driver.approvalStatus !== DriverApprovalStatus.PENDING) {
      throw new AppError(400, "Driver application is not pending.");
    }

    const updatedDriver = await DriverModel.findByIdAndUpdate(
      driverId,
      { approvalStatus: DriverApprovalStatus.APPROVED },
      { new: true, session },
    );

    if (!updatedDriver) {
      throw new AppError(500, "Failed to update driver approval status.");
    }

    const userId = updatedDriver.userId;
    if (!userId) {
      // Rollback by aborting transaction
      await session.abortTransaction();
      throw new AppError(500, "Associated user ID not found for driver.");
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: Role.DRIVER },
      { new: true, session },
    );

    if (!updateUser) {
      // Rollback by aborting transaction
      await session.abortTransaction();
      throw new AppError(404, "User NOT Found! Driver approval rolled back.");
    }

    await session.commitTransaction();
    session.endSession();

    return updatedDriver;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      500,
      "An unexpected error occurred during driver approval.",
    );
  }
};

const rejectDriver = async (driverId: string) => {
  const driver = await DriverModel.findById(driverId);

  if (!driver) {
    throw new AppError(404, "Driver NOT Found!");
  }

  if (driver.approvalStatus !== DriverApprovalStatus.PENDING) {
    throw new AppError(400, "Driver application is not pending.");
  }

  const updatedDriver = await DriverModel.findByIdAndUpdate(
    driverId,
    { approvalStatus: DriverApprovalStatus.REJECTED },
    { new: true },
  );

  return updatedDriver;
};

export const AdminServices = {
  approveDriver,
  rejectDriver,
};
