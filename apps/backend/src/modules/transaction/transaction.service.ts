import { PaymentGateway, PaymentStatus } from "@/types/types";

import { RideModel } from "../ride/ride.model";
import { TransactionModel } from "./transaction.model";

const processPaymentService = async ({
  rideId,
  paymentGateway,
  userId,
}: {
  rideId: string;
  paymentGateway: string;
  userId: string;
}) => {
  const ride = await RideModel.findById(rideId);

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.riderId !== userId) {
    throw new Error("You are not authorized to pay for this ride");
  }

  const trans = await TransactionModel.findOne({
    transactionId: ride.transactionId,
  });

  if (trans && trans.paymentStatus === PaymentStatus.PAID) {
    throw new Error("This ride has already been paid for");
  }

  if (trans) {
    trans.paymentGateway = paymentGateway as PaymentGateway;
    trans.paymentStatus = PaymentStatus.PAID;
    await trans.save();
  }

  return trans;
};

export const TransactionServices = {
  processPaymentService,
};
