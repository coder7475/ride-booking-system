import { Schema } from "mongoose";

import { ILocation } from "../types";

export const LocationSchema = new Schema<ILocation>(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false, versionKey: false },
);
