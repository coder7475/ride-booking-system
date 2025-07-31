import { DriverApprovalStatus } from "@/types/types";
import { z } from "zod";

import { IDriver } from "./driver.interface";
import { DriverModel } from "./driver.model";
import { CreateDriverSchema } from "./driver.schema";

const createDriver = async (input: z.infer<typeof CreateDriverSchema>) => {
  const newDriver = {
    ...input,
    approvalStatus: DriverApprovalStatus.PENDING,
  };

  return await DriverModel.create(newDriver);
};

const updateDriverStatus = async (
  driverId: string,
  updateData: Partial<IDriver>,
) => {
  const updatedDriver = await DriverModel.findByIdAndUpdate(
    driverId,
    updateData,
    { new: true },
  );
  return updatedDriver;
};

const findDriverByUserId = async (userId: string) => {
  return await DriverModel.findOne({ userId });
};

export const DriverServices = {
  createDriver,
  updateDriverStatus,
  findDriverByUserId,
};
