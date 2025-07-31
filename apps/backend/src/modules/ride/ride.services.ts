import { generateTransactionId } from "@repo/utils";

import { IRide } from "./ride.interface";
import { RideModel } from "./ride.model";

export const createRideRequest = async (rideData: Partial<IRide>) => {
  // Validate required fields
  if (!rideData.riderId) {
    throw new Error('riderId is required');
  }
  if (!rideData.fareEstimated) {
    throw new Error('fareEstimated is required');
  }
  if (!rideData.pickupLocation) {
    throw new Error('pickupLocation is required');
  }
  if (!rideData.destinationLocation) {
    throw new Error('destinationLocation is required');
  }

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
