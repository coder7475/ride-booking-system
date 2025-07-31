import { LocationSchema } from "@/types/mongoose/location.schema";
import { RideTimestampsSchema } from "@/types/mongoose/timestamps.schema";
import { RideStatus } from "@/types/types";
import { Document, model, Schema } from "mongoose";

import { IRide } from "./ride.interface";

export interface IRideDocument extends Document, IRide {}

const RideSchemaMongoose = new Schema<IRideDocument>(
  {
    rider_id: { type: String, required: true, ref: "User" },
    driver_id: { type: String, required: true, ref: "Driver" },
    ride_status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
    },
    pickup_location: LocationSchema,
    destination_location: LocationSchema,
    transaction_id: { type: String, required: true, ref: "Transaction" },
    fare_estimated: { type: Number, required: true },
    fare_final: { type: Number, required: true },
    timestamps: { type: RideTimestampsSchema, default: {} },
  },
  { versionKey: false, timestamps: true },
);

export const RideModel = model<IRideDocument>("Ride", RideSchemaMongoose);
