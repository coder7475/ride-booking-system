import type { Request, Response } from "express";
import type { ILocation } from "@/types/types";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";

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

	if (!rideId) {
		throw new Error("Ride ID is required");
	}

	const ride = await RideServices.cancelRide(riderId, rideId);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Ride cancelled successfully",
		data: ride,
	});
});

const singleRideRequest = catchAsync(async (req: Request, res: Response) => {
	const rideId = req.params.id;

	if (!rideId) {
		throw new Error("Ride ID is required");
	}

	const ride = await RideServices.findRideById(rideId);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Ride details fetched successfully",
		data: ride,
	});
});

const listMyRides = catchAsync(async (req: Request, res: Response) => {
	const riderId = req.user.id;

	const rides = await RideServices.findRidesByRiderId(riderId);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Ride history fetched successfully",
		data: rides,
	});
});

const handleAcceptRide = catchAsync(async (req: Request, res: Response) => {
	const driverId = req.user.id;
	const rideId = req.params.id;

	if (!rideId) {
		throw new Error("Ride ID is required");
	}

	const ride = await RideServices.acceptRide(driverId, rideId);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Ride accepted successfully",
		data: ride,
	});
});

const handlePickedUp = catchAsync(async (req: Request, res: Response) => {
	const driverId = req.user.id;
	const rideId = req.params.id;

	if (!rideId) {
		throw new Error("Ride ID is required");
	}

	const ride = await RideServices.pickedUp(driverId, rideId);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Ride marked as picked up successfully",
		data: ride,
	});
});

const handleInTransit = catchAsync(async (req: Request, res: Response) => {
	const driverId = req.user.id;
	const rideId = req.params.id;

	if (!rideId) {
		throw new Error("Ride ID is required");
	}

	const ride = await RideServices.inTransit(driverId, rideId);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Ride marked as in transit successfully",
		data: ride,
	});
});

const handleCompleted = catchAsync(async (req: Request, res: Response) => {
	const driverId = req.user.id;
	const rideId = req.params.id;

	if (!rideId) {
		throw new Error("Ride ID is required");
	}

	const data = await RideServices.completedRide(driverId, rideId);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Ride marked as completed successfully",
		data,
	});
});

const estimateFare = catchAsync(async (req: Request, res: Response) => {
	// Get locations from params and create pickup and destination location
	const { pickupLat, pickupLng, destLat, destLng } = req.query;

	if (
		typeof pickupLat !== "string" ||
		typeof pickupLng !== "string" ||
		typeof destLat !== "string" ||
		typeof destLng !== "string"
	) {
		throw new Error("Missing or invalid location parameters");
	}

	const pickupLocation: ILocation = {
		latitude: parseFloat(pickupLat),
		longitude: parseFloat(pickupLng),
	};

	const destinationLocation: ILocation = {
		latitude: parseFloat(destLat),
		longitude: parseFloat(destLng),
	};

	const fare = await RideServices.estimateFare(
		pickupLocation,
		destinationLocation,
	);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Fare estimated successfully",
		data: { fare },
	});
});

export const RidesController = {
	handleRequestRide,
	handleCancelRide,
	singleRideRequest,
	listMyRides,
	handleAcceptRide,
	handlePickedUp,
	handleInTransit,
	handleCompleted,
	estimateFare,
};
