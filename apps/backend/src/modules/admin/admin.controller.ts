import type { NextFunction, Request, Response } from "express";
import AppError from "@/configs/AppError";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { AdminServices } from "./admin.service";

const approveDriver = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const driverId = req.params.id;

		if (!driverId) {
			throw new AppError(400, "Driver ID is required");
		}

		const updatedDriver = await AdminServices.approveDriver(driverId);

		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Driver approved successfully",
			data: updatedDriver,
		});
	},
);

const rejectDriver = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const driverId = req.params.id;

		if (!driverId) {
			throw new AppError(400, "Driver ID is required");
		}

		const updatedDriver = await AdminServices.rejectDriver(driverId);

		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Driver rejected successfully",
			data: updatedDriver,
		});
	},
);

const getUsers = catchAsync(
	async (_req: Request, res: Response, _next: NextFunction) => {
		const users = await AdminServices.listUsers();
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Users fetched successfully",
			data: users,
		});
	},
);

const getDrivers = catchAsync(
	async (_req: Request, res: Response, _next: NextFunction) => {
		const drivers = await AdminServices.listDrivers();
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Drivers fetched successfully",
			data: drivers,
		});
	},
);

const getRides = catchAsync(
	async (_req: Request, res: Response, _next: NextFunction) => {
		const rides = await AdminServices.listRides();
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "Rides fetched successfully",
			data: rides,
		});
	},
);

const getUserById = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.params.id;
		if (!userId) {
			throw new AppError(400, "User ID is required");
		}
		const user = await AdminServices.getUserById(userId);
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "User fetched successfully",
			data: user,
		});
	},
);

const blockUser = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.params.id;
		if (!userId) {
			throw new AppError(400, "User ID is required");
		}
		// Assuming AdminServices has a blockUser method
		const user = await AdminServices.blockUser(userId);
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "User blocked successfully",
			data: user,
		});
	},
);

const unblockUser = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.params.id;
		if (!userId) {
			throw new AppError(400, "User ID is required");
		}
		const user = await AdminServices.unblockUser(userId);
		sendResponse(res, {
			statusCode: 200,
			success: true,
			message: "User unblocked successfully",
			data: user,
		});
	},
);

export const AdminController = {
	blockUser,
	unblockUser,
	getUserById,
	getUsers,
	getRides,
	getDrivers,
	approveDriver,
	rejectDriver,
};
