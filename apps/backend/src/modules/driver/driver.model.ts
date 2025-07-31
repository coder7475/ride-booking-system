import {
  DriverApprovalStatus,
  DriverOnlineStatus,
  ILocation,
  IVehicleInfo,
} from "@/types/types";
import { Document, model, Model, Schema } from "mongoose";

import { IDriver } from "./driver.interface";

interface IDriverDoc extends IDriver, Document {}

const LocationSchema = new Schema<ILocation>(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false, versionKey: false },
);

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
