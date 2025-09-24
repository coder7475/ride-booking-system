import { Schema } from "mongoose";

import type { IRideStatusTimestamps } from "../types";

export const RideTimestampsSchema = new Schema<IRideStatusTimestamps>(
  {
    requested: { type: Date },
    accepted: { type: Date },
    started: { type: Date },
    inTransit: { type: Date },
    completed: { type: Date },
    canceled: { type: Date },
  },
  { _id: false, versionKey: false },
);
