import { AccountStatus, IAuthProvider, Role } from "@/types/types";
import { Document, Model, model, Schema } from "mongoose";

import { IUser } from "./user.interface";

export interface IUserDoc extends IUser, Document {}

const MongooseAuthProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  },
);
const UserMongooseSchema = new Schema<IUserDoc>(
  {
    email: { type: String, required: true, unique: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    account_status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    auth_providers: [MongooseAuthProviderSchema],
  },
  { timestamps: true, versionKey: false },
);

export const UserModel: Model<IUserDoc> = model("User", UserMongooseSchema);
