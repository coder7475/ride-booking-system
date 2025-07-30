import { RideStatus } from "@/types/types";
import { Document, model, Schema } from "mongoose";

import { IRide } from "./ride.interface";

export interface IRideDocument extends Document, IRide {}

const RideSchemaMongoose = new Schema<IRideDocument>(
  {
    ride_id: { type: String, required: true, unique: true },
    rider_id: { type: String, required: true, ref: "User" },
    driver_id: { type: String, required: true, ref: "Driver" },
    ride_status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
    },
    pickup_location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    destination_location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    transaction_id: { type: String, required: true, ref: "Transaction" },
    fare_estimated: { type: Number, required: true },
    fare_final: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    timestamps: { type: Map, of: Date },
  },
  { timestamps: false },
);

export const RideModel = model<IRideDocument>("Ride", RideSchemaMongoose);
