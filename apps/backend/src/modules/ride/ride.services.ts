import { generateTransactionId } from "@repo/utils";

import { IRide } from "./ride.interface";
import { RideModel } from "./ride.model";

export const createRideRequest = async (rideData: Partial<IRide>) => {
  const transactionId = generateTransactionId();
  const newRideRequest = {
    ...rideData,
    transactionId,
  };

  return await RideModel.create(newRideRequest);
};

export const RideServices = {
  createRideRequest,
};
