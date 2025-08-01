import AppError from "@/configs/AppError";
import { DriverApprovalStatus, Role } from "@/types/types";

import { DriverModel } from "../driver/driver.model";
import { UserModel } from "../user/user.model";

const approveDriver = async (driverId: string) => {
  const driver = await DriverModel.findById(driverId);

  if (!driver) {
    throw new AppError(404, "Driver NOT Found!");
  }

  if (driver.approvalStatus !== DriverApprovalStatus.PENDING) {
    throw new AppError(400, "Driver application is not pending.");
  }

  const updatedDriver = await DriverModel.findByIdAndUpdate(
    driverId,
    { approvalStatus: DriverApprovalStatus.APPROVED },
    { new: true },
  );

  if (updatedDriver) {
    const userId = updatedDriver.userId;
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: Role.DRIVER },
      { new: true },
    );
    if (!updateUser) {
      throw new AppError(404, "User NOT Found!");
    }
  }

  return updatedDriver;
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
