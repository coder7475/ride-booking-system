import { DriverApprovalStatus } from "@/types/types";
import { z } from "zod";

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
  status: DriverApprovalStatus,
) => {
  const updatedDriver = await DriverModel.findByIdAndUpdate(
    driverId,
    { approvalStatus: status },
    { new: true },
  );
  return updatedDriver;
};

export const DriverServices = {
  createDriver,
  updateDriverStatus,
};
