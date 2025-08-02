import { type Document, model, Schema } from "mongoose";
import { LocationSchema } from "@/types/mongoose/location.schema";
import { RideTimestampsSchema } from "@/types/mongoose/timestamps.schema";
import { RideStatus } from "@/types/types";

import type { IRide } from "./ride.interface";

export interface IRideDocument extends Document, IRide {}

const RideSchemaMongoose = new Schema<IRideDocument>(
	{
		riderId: { type: String, required: true, ref: "User" },
		driverId: { type: String, required: false, ref: "Driver", default: null },
		rideStatus: {
			type: String,
			enum: Object.values(RideStatus),
			default: RideStatus.REQUESTED,
		},
		pickupLocation: LocationSchema,
		destinationLocation: LocationSchema,
		transactionId: { type: String, required: true, ref: "Transaction" },
		fareEstimated: { type: Number, required: true },
		fareFinal: { type: Number, required: true, default: 0 },
		timestamps: { type: RideTimestampsSchema, default: {} },
	},
	{ versionKey: false, timestamps: true },
);

export const RideModel = model<IRideDocument>("Ride", RideSchemaMongoose);
