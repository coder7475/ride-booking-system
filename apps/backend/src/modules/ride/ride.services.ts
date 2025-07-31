import AppError from "@/configs/AppError";
import { RideStatus } from "@/types/types";
import { generateTransactionId } from "@repo/utils";

import { IRide } from "./ride.interface";
import { RideModel } from "./ride.model";

const createRideRequest = async (rideData: Partial<IRide>) => {
  // Validate required fields
  if (!rideData.riderId) {
    throw new Error("riderId is required");
  }
  if (!rideData.fareEstimated) {
    throw new Error("fareEstimated is required");
  }
  if (!rideData.pickupLocation) {
    throw new Error("pickupLocation is required");
  }
  if (!rideData.destinationLocation) {
    throw new Error("destinationLocation is required");
  }

  const transactionId = generateTransactionId();
  const newRideRequest = {
    ...rideData,
    transactionId,
  };

  return await RideModel.create(newRideRequest);
};

const cancelRide = async (riderId: string, rideId: string) => {
  // Find the ride by id and riderId to ensure the user owns the ride
  const ride = await RideModel.findOne({ _id: rideId, riderId });

  if (!ride) {
    throw new AppError(
      404,
      "Ride not found or you do not have permission to cancel this ride.",
    );
  }

  // Only allow cancellation if ride is still in REQUESTED status
  if (ride.rideStatus !== RideStatus.REQUESTED) {
    throw new AppError(400, "Ride cannot be cancelled at this stage.");
  }

  ride.rideStatus = RideStatus.CANCELLED;
  ride.timestamps = {
    ...ride.timestamps,
    canceled: new Date().toISOString(),
  };

  await ride.save();
  return ride;
};

const findRideById = async (rideId: string) => {
  const ride = await RideModel.findById(rideId);
  if (!ride) {
    throw new AppError(404, "Ride not found.");
  }
  return ride;
};

const findRidesByRiderId = async (riderId: string) => {
  return await RideModel.find({ riderId }).sort({ createdAt: -1 });
};

export const RideServices = {
  createRideRequest,
  cancelRide,
  findRideById,
  findRidesByRiderId,
};
