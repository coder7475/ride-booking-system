import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { Request, Response } from "express";

import { RideServices } from "./ride.services";

const handleRequestRide = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const riderId = req.user.id;

  const requestData = {
    riderId,
    ...body,
  };

  const ride = await RideServices.createRideRequest(requestData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Ride request created successfully",
    data: ride,
  });
});

const handleCancelRide = catchAsync(async (req: Request, res: Response) => {
  const riderId = req.user.id;
  const rideId = req.params.id;

  const ride = await RideServices.cancelRide(riderId, rideId!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride cancelled successfully",
    data: ride,
  });
});

const singleRideRequest = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;

  const ride = await RideServices.findRideById(rideId!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride details fetched successfully",
    data: ride,
  });
});

export const RidesController = {
  handleRequestRide,
  handleCancelRide,
  singleRideRequest,
};
