import { type Document, type Model, model, Schema } from "mongoose";
import { LocationSchema } from "@/types/mongoose/location.schema";
import {
	DriverApprovalStatus,
	DriverOnlineStatus,
	type IVehicleInfo,
} from "@/types/types";

import type { IDriver } from "./driver.interface";

export interface IDriverDoc extends IDriver, Document {}

const VehicleInfoSchema = new Schema<IVehicleInfo>(
	{
		vehicleType: { type: String, required: true },
		brand: { type: String, required: true },
		model: { type: String, required: true },
		year: { type: Number, required: true },
		plateNumber: { type: String, required: true },
	},
	{ _id: false, versionKey: false },
);

const DriverSchema = new Schema<IDriverDoc>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			ref: "User",
		},
		approvalStatus: {
			type: String,
			enum: Object.values(DriverApprovalStatus),
			default: DriverApprovalStatus.PENDING,
		},
		onlineStatus: {
			type: String,
			enum: Object.values(DriverOnlineStatus),
			default: DriverOnlineStatus.OFFLINE,
		},
		driverLocation: { type: LocationSchema, required: true },
		vehicleInfo: { type: VehicleInfoSchema, required: true },
	},
	{ timestamps: true, versionKey: false },
);

export const DriverModel: Model<IDriverDoc> = model("Driver", DriverSchema);
