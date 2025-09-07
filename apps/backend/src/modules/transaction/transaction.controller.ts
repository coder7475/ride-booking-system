import AppError from "@/configs/AppError";
import { env } from "@/configs/envConfig";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { mongoConnector } from "@repo/db";
import { Request, Response } from "express";

import { TransactionServices } from "./transaction.service";

// Controller to handle the /pay endpoint
const processPayment = catchAsync(async (req: Request, res: Response) => {
  await mongoConnector(env.DB_URI);
  const { rideId, paymentGateway } = req.body;
  const userId = req.user?.id;
  if (!rideId || !paymentGateway) {
    throw new AppError(400, "rideId and process");
  }
  const data = await TransactionServices.processPaymentService({
    rideId,
    paymentGateway,
    userId,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment processed successfully",
    data,
  });
});

export const TransactionAuthController = {
  processPayment,
};
