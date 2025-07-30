import { DriverApprovalStatus, DriverOnlineStatus } from "@/types/types";
import { Document, model, Schema } from "mongoose";

import { IDriver } from "./driver.interface";

export interface IDriverDocument extends Document, IDriver {}

const DriverSchemaMongoose = new Schema<IDriverDocument>(
  {
    driver_id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true, ref: "User" },
    approval_status: {
      type: String,
      enum: Object.values(DriverApprovalStatus),
      default: DriverApprovalStatus.PENDING,
    },
    online_status: {
      type: String,
      enum: Object.values(DriverOnlineStatus),
      default: DriverOnlineStatus.OFFLINE,
    },
    driver_location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    vehicle_info: { type: String, required: true },
  },
  { timestamps: true },
);

export const DriverModel = model<IDriverDocument>(
  "Driver",
  DriverSchemaMongoose,
);
