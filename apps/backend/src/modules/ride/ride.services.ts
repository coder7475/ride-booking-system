import AppError from "@/configs/AppError";
import { PaymentGateway, RideStatus, type ILocation } from "@/types/types";
import { calculateFareEstimate } from "@/utils/calculateFare";
import { generateTransactionId } from "@repo/utils";

import { DriverModel } from "../driver/driver.model";
import { TransactionModel } from "../transaction/transaction.model";
import type { IRide } from "./ride.interface";
import { RideModel } from "./ride.model";

const createRideRequest = async (
  rideData: Partial<IRide>,
  paymentGateway: PaymentGateway,
) => {
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

  // create new ride request
  const rideRequest = await RideModel.create(newRideRequest);

  // Calculate Final Fare
  const finalFare = calculateFareEstimate(
    rideData.pickupLocation,
    rideData.destinationLocation,
  );

  rideData.fareFinal = finalFare;

  const FinalTransaction = {
    transactionId,
    amount: finalFare,
    paymentGateway,
  };

  const transaction = await TransactionModel.create(FinalTransaction);

  return {
    rideRequest,
    transaction,
  };
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

const completedRide = async (userId: string, rideId: string) => {
  const driver = await DriverModel.findOne({ userId });
  const ride = await RideModel.findById(rideId);

  if (!ride) {
    throw new AppError(404, "Ride not found.");
  }

  if (!driver) {
    throw new AppError(404, "Driver not found.");
  }

  // Only the assigned driver can mark as completed
  if (ride.driverId !== userId) {
    throw new AppError(403, "You are not authorized to update this ride.");
  }

  // Only allow if ride is in IN_TRANSIT status
  if (ride.rideStatus !== RideStatus.IN_TRANSIT) {
    throw new AppError(
      400,
      "Ride cannot be marked as completed at this stage.",
    );
  }

  if (!driver.driverLocation) {
    throw new AppError(
      400,
      "Driver location is required to complete the ride.",
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
    driver.driverLocation,
  );

  ride.fareFinal = finalFare;

  await ride.save();

  const FinalTransaction = {
    amount: finalFare,
  };

  const transaction = await TransactionModel.findOneAndUpdate(
    { transactionId: ride.transactionId },
    FinalTransaction,
    { new: true },
  );

  return {
    ride,
    transaction,
  };
};

const estimateFare = async (
  pickupLocation: ILocation,
  destinationLocation: ILocation,
): Promise<number> => {
  const estimatedFare = calculateFareEstimate(
    pickupLocation,
    destinationLocation,
  );
  return estimatedFare;
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
  estimateFare,
};
