import AppError from "@/configs/AppError";
import { DriverApprovalStatus } from "@/types/types";

import { DriverModel } from "../driver/driver.model";

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
