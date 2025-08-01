import { type Document, type Model, model, Schema } from "mongoose";
import { AccountStatus, type IAuthProvider, Role } from "@/types/types";

import type { IUser } from "./user.interface";

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
		userName: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, enum: Object.values(Role), default: Role.USER },
		accountStatus: {
			type: String,
			enum: Object.values(AccountStatus),
			default: AccountStatus.ACTIVE,
		},
		authProviders: [MongooseAuthProviderSchema],
	},
	{ timestamps: true, versionKey: false },
);

export const UserModel: Model<IUserDoc> = model("User", UserMongooseSchema);
