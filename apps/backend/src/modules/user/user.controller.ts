import type { NextFunction, Request, Response } from "express";
import { AccountStatus, Role } from "@/types/types";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";

import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
	const userData = req.body;
	const user = await UserServices.createUser(userData);

	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "User created successfully",
		data: user,
	});
});

const updateUser = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user.id;
		const updateData = req.body;
		const result = await UserServices.updateUserById(userId, updateData);

		sendResponse(res, {
			success: true,
			statusCode: 200,
			message: "User data updated successfully",
			data: result,
		});
	},
);

const getMe = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user.id;
		const user = await UserServices.findUserById(userId);

		sendResponse(res, {
			success: true,
			statusCode: 200,
			message: "Your profile retrieved successfully",
			data: user,
		});
	},
);

const getPublicProfile = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.params.id;

		if (!userId) {
			sendResponse(res, {
				success: false,
				statusCode: 400,
				message: "User ID is required",
				data: null,
			});
			return;
		}

		const user = await UserServices.findUserById(userId);

		if (
			!user ||
			user.accountStatus !== AccountStatus.ACTIVE ||
			user.role === Role.ADMIN
		) {
			sendResponse(res, {
				success: false,
				statusCode: 403,
				message: "User profile is not accessible",
				data: null,
			});
			return;
		}

		const publicProfile = user
			? {
					name: user.userName,
					email: user.email,
				}
			: null;

		sendResponse(res, {
			success: true,
			statusCode: 200,
			message: "Public Profile retrieved successfully",
			data: publicProfile,
		});
	},
);

const deleteUser = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user.id;

		const deletedUser = await UserServices.deleteUser(userId);

		sendResponse(res, {
			success: true,
			statusCode: 200,
			message: "User deleted (deactivated) successfully",
			data: deletedUser,
		});
	},
);

export const userController = {
	createUser,
	updateUser,
	getMe,
	getPublicProfile,
	deleteUser,
};
