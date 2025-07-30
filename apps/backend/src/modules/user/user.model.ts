import { AccountStatus, AuthProviderNames, Role } from "@/types/types";
import mongoose, { Document, Model, Schema } from "mongoose";

import { IUser } from "./user.interface";

interface IUserDoc extends IUser, Document {}

const UserMongooseSchema = new Schema<IUserDoc>(
  {
    user_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    account_status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    auth_providers: [
      {
        provider: {
          type: String,
          enum: Object.values(AuthProviderNames),
          required: true,
        },
        providerId: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const UserModel: Model<IUserDoc> = mongoose.model(
  "User",
  UserMongooseSchema,
);
