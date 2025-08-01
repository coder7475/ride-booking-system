import AppError from "@/configs/AppError";
import { RideStatus } from "@/types/types";
import { calculateFareEstimate } from "@/utils/calculateFare";
import { generateTransactionId } from "@repo/utils";

import { DriverModel } from "../driver/driver.model";
import { TransactionModel } from "../transaction/transaction.model";
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

const acceptRide = async (driverId: string, rideId: string) => {
  const ride = await RideModel.findById(rideId);

  if (!ride) {
    throw new AppError(404, "Ride not found.");
  }

  // Only allow accepting if ride is still in REQUESTED status
  if (ride.rideStatus !== RideStatus.REQUESTED) {
    throw new AppError(400, "Ride cannot be accepted at this stage.");
  }

  // Assign driver and update status
  ride.driverId = driverId;
  ride.rideStatus = RideStatus.ACCEPTED;
  ride.timestamps = {
    ...ride.timestamps,
    accepted: new Date().toISOString(),
  };

  await ride.save();
  return ride;
};

const pickedUp = async (driverId: string, rideId: string) => {
  const ride = await RideModel.findById(rideId);

  if (!ride) {
    throw new AppError(404, "Ride not found.");
  }

  // Only the assigned driver can mark as picked up
  if (ride.driverId !== driverId) {
    throw new AppError(403, "You are not authorized to update this ride.");
  }

  // Only allow if ride is in ACCEPTED status
  if (ride.rideStatus !== RideStatus.ACCEPTED) {
    throw new AppError(
      400,
      "Ride cannot be marked as picked up at this stage.",
    );
  }

  ride.rideStatus = RideStatus.PICKED_UP;
  ride.timestamps = {
    ...ride.timestamps,
    started: new Date().toISOString(),
  };

  await ride.save();
  return ride;
};

const inTransit = async (driverId: string, rideId: string) => {
  const ride = await RideModel.findById(rideId);

  if (!ride) {
    throw new AppError(404, "Ride not found.");
  }

  // Only the assigned driver can mark as in transit
  if (ride.driverId !== driverId) {
    throw new AppError(403, "You are not authorized to update this ride.");
  }

  // Only allow if ride is in PICKED_UP status
  if (ride.rideStatus !== RideStatus.PICKED_UP) {
    throw new AppError(
      400,
      "Ride cannot be marked as in transit at this stage.",
    );
  }

  ride.rideStatus = RideStatus.IN_TRANSIT;
  ride.timestamps = {
    ...ride.timestamps,
    inTransit: new Date().toISOString(),
  };

  await ride.save();
  return ride;
};

const completedRide = async (driverId: string, rideId: string) => {
  const driver = await DriverModel.findById(driverId);
  const ride = await RideModel.findById(rideId);

  if (!ride) {
    throw new AppError(404, "Ride not found.");
  }

  // Only the assigned driver can mark as completed
  if (ride.driverId !== driverId) {
    throw new AppError(403, "You are not authorized to update this ride.");
  }

  // Only allow if ride is in IN_TRANSIT status
  if (ride.rideStatus !== RideStatus.IN_TRANSIT) {
    throw new AppError(
      400,
      "Ride cannot be marked as completed at this stage.",
    );
  }

  ride.rideStatus = RideStatus.COMPLETED;
  ride.timestamps = {
    ...ride.timestamps,
    completed: new Date().toISOString(),
  };

  // Calculate Final Fare
  const finalFare = calculateFareEstimate(
    ride.pickupLocation,
    driver?.driverLocation!,
  );
  ride.fareFinal = finalFare;

  await ride.save();

  const FinalTransaction = {
    transactionId: ride.transactionId,
    amount: finalFare,
  };

  const transaction = await TransactionModel.create(FinalTransaction);

  return {
    ride,
    transaction,
  };
};

export const RideServices = {
  createRideRequest,
  cancelRide,
  findRideById,
  findRidesByRiderId,
  acceptRide,
  pickedUp,
  inTransit,
  completedRide,
};
