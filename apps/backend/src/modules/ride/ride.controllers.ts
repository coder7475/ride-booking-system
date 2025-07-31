import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { Request, Response } from "express";

import { RideServices } from "./ride.services";

export const handleRequestRide = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body;
    const riderId = req.user.id;
    const requestData = {
      ...body,
      riderId,
    };

    const ride = await RideServices.createRideRequest(requestData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Ride request created successfully",
      data: ride,
    });
  },
);
