import { Document, model, Schema } from "mongoose";

import { IUser } from "./user.interface";

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional, as per interface
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUserDocument>("User", userSchema);
