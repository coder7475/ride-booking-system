import type { z } from "zod";
import { DriverApprovalStatus } from "@/types/types";

import { RideModel } from "../ride/ride.model";
import type { IDriver } from "./driver.interface";
import { DriverModel } from "./driver.model";
import type { CreateDriverSchema } from "./driver.schema";

const createDriver = async (input: z.infer<typeof CreateDriverSchema>) => {
	const newDriver = {
		...input,
		approvalStatus: DriverApprovalStatus.PENDING,
	};

	return await DriverModel.create(newDriver);
};

const updateDriverStatus = async (
	driverId: string,
	updateData: Partial<IDriver>,
) => {
	const updatedDriver = await DriverModel.findByIdAndUpdate(
		driverId,
		updateData,
		{ new: true },
	);
	return updatedDriver;
};

const findDriverByUserId = async (userId: string) => {
	return await DriverModel.findOne({ userId });
};

const earningHistory = async (driverId: string) => {
	const rides = await RideModel.find({
		driverId,
		rideStatus: "COMPLETED",
	}).select("fareFinal rideStatus createdAt");

	const totalEarnings = rides.reduce(
		(sum, ride) =>
			ride.rideStatus === "COMPLETED" ? sum + (ride.fareFinal || 0) : sum,
		0,
	);

	return {
		totalEarnings,
		rides,
	};
};

export const DriverServices = {
	createDriver,
	updateDriverStatus,
	findDriverByUserId,
	earningHistory,
};
