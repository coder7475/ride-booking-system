import { verifyPassword } from "@repo/utils";
import AppError from "@/configs/AppError";
import { AccountStatus } from "@/types/types";
import { generateToken, verifyToken } from "@/utils/jwtHelpers";

import type { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";

export const login = async (credentials: Partial<IUser>) => {
	const { email, password } = credentials;

	if (!email || !password) {
		throw new AppError(400, "Email and password are required!");
	}

	const isUser = await UserModel.findOne({ email });

	if (!isUser) {
		throw new AppError(400, "User does not exits!");
	}

	if (isUser.accountStatus === AccountStatus.BLOCKED) {
		throw new AppError(403, "User is blocked!");
	}
	if (isUser.accountStatus === AccountStatus.SUSPENDED) {
		throw new AppError(403, "User is suspended!");
	}
	if (isUser.accountStatus === AccountStatus.DEACTIVATED) {
		throw new AppError(403, "User is deleted!");
	}

	const pass = verifyPassword(password, isUser.password);

	if (!pass) {
		throw new AppError(400, "Incorrect Password!");
	}

	const payload = {
		id: isUser._id,
		email: isUser.email,
		role: isUser.role,
	};

	const accessToken = generateToken(payload, "access");
	const refreshToken = generateToken(payload, "refresh");

	return {
		accessToken,
		refreshToken,
	};
};

const reissueAccessToken = async (refreshToken: string) => {
	const verifiedPayload = verifyToken(refreshToken, "refresh");
	const isUser = await UserModel.findOne({ email: verifiedPayload.email });
	if (!isUser) {
		throw new AppError(404, "User does not Exits!");
	}

	if (!isUser) {
		throw new AppError(400, "User does not exits!");
	}
	if (isUser.accountStatus === AccountStatus.BLOCKED) {
		throw new AppError(403, "User is blocked!");
	}
	if (isUser.accountStatus === AccountStatus.SUSPENDED) {
		throw new AppError(403, "User is suspended!");
	}
	if (isUser.accountStatus === AccountStatus.DEACTIVATED) {
		throw new AppError(403, "User is deleted!");
	}

	const payload = {
		id: isUser._id,
		email: isUser.email,
		role: isUser.role,
	};

	const accessToken = generateToken(payload, "access");

	return accessToken;
};

export const AuthServices = {
	login,
	reissueAccessToken,
};
