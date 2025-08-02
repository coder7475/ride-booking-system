import AppError from "@/configs/AppError";
import { AccountStatus, DriverApprovalStatus, Role } from "@/types/types";

import { DriverModel } from "../driver/driver.model";
import { RideModel } from "../ride/ride.model";
import { UserModel } from "../user/user.model";

const approveDriver = async (driverId: string) => {
	const mongoose = require("mongoose");
	const session = await mongoose.startSession();

	try {
		if (!driverId) {
			throw new AppError(400, "Driver ID is required.");
		}

		session.startTransaction();

		const driver = await DriverModel.findById(driverId).session(session);

		if (!driver) {
			throw new AppError(404, "Driver NOT Found!");
		}

		if (driver.approvalStatus !== DriverApprovalStatus.PENDING) {
			throw new AppError(400, "Driver application is not pending.");
		}

		const updatedDriver = await DriverModel.findByIdAndUpdate(
			driverId,
			{ approvalStatus: DriverApprovalStatus.APPROVED },
			{ new: true, session },
		);

		if (!updatedDriver) {
			throw new AppError(500, "Failed to update driver approval status.");
		}

		const userId = updatedDriver.userId;
		if (!userId) {
			// Rollback by aborting transaction
			await session.abortTransaction();
			throw new AppError(500, "Associated user ID not found for driver.");
		}

		const updateUser = await UserModel.findByIdAndUpdate(
			userId,
			{ role: Role.DRIVER },
			{ new: true, session },
		);

		if (!updateUser) {
			// Rollback by aborting transaction
			await session.abortTransaction();
			throw new AppError(404, "User NOT Found! Driver approval rolled back.");
		}

		await session.commitTransaction();
		session.endSession();

		return updatedDriver;
	} catch (error) {
		if (session.inTransaction()) {
			await session.abortTransaction();
		}
		session.endSession();
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			500,
			"An unexpected error occurred during driver approval.",
		);
	}
};

const rejectDriver = async (driverId: string) => {
	const driver = await DriverModel.findById(driverId);

	if (!driver) {
		throw new AppError(404, "Driver NOT Found!");
	}

	if (driver.approvalStatus !== DriverApprovalStatus.PENDING) {
		throw new AppError(400, "Driver application is not pending.");
	}

	const updatedDriver = await DriverModel.findByIdAndUpdate(
		driverId,
		{ approvalStatus: DriverApprovalStatus.REJECTED },
		{ new: true },
	);

	return updatedDriver;
};

const listUsers = async () => {
	return await UserModel.find({}).exec();
};

const listDrivers = async () => {
	return await DriverModel.find({}).exec();
};

const listRides = async () => {
	return await RideModel.find({}).exec();
};

const getUserById = async (userId: string) => {
	const user = await UserModel.findById(userId).exec();
	if (!user) {
		throw new AppError(404, "User not found");
	}
	return user;
};

const blockUser = async (userId: string) => {
	const user = await UserModel.findById(userId);

	if (!user) {
		throw new AppError(404, "User not found");
	}

	if (user.accountStatus === AccountStatus.BLOCKED) {
		throw new AppError(400, "User is already blocked");
	}

	user.accountStatus = AccountStatus.BLOCKED;
	await user.save();

	return user;
};
const unblockUser = async (userId: string) => {
	const user = await UserModel.findById(userId);

	if (!user) {
		throw new AppError(404, "User not found");
	}

	if (user.accountStatus !== AccountStatus.BLOCKED) {
		throw new AppError(400, "User is not blocked");
	}

	user.accountStatus = AccountStatus.ACTIVE;
	await user.save();

	return user;
};

export const AdminServices = {
	getUserById,
	listDrivers,
	listUsers,
	listRides,
	approveDriver,
	rejectDriver,
	blockUser,
	unblockUser,
};
