import AppError from "@/configs/AppError";
import { env } from "@/configs/envConfig";
import { AccountStatus } from "@/types/types";
import { generateToken, verifyToken } from "@/utils/jwtHelpers";
import { sendEmail } from "@/utils/sendEmail";
import { hashPassword, verifyPassword } from "@repo/utils";
import { JwtPayload } from "jsonwebtoken";

import type { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { IChangePassword, IResetPassword } from "./auth.interface";

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

const forgetPassword = async (email: string) => {
  const userExisting = await UserModel.findOne({ email });

  if (!userExisting) {
    throw new AppError(400, "User does not exits");
  }
  if (!userExisting.isVerified) {
    throw new AppError(400, "User is not verified");
  }
  // deny if user is suspended, blocked, or deactivate(deleted)
  if (userExisting.accountStatus !== "active") {
    throw new AppError(400, "User is not active");
  }

  // create token for verification
  const payload = {
    id: userExisting._id,
    email,
    role: userExisting.role,
  };
  const token = generateToken(payload, "access");

  const resetLink = `${env.FRONTEND_LINK}/reset-password?id=${payload.id}&token=${token}`;

  // console.log(resetLink);

  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    templateName: "resetPassword",
    templateData: {
      name: userExisting.userName || "User",
      resetLink,
    },
  });

  return {
    message: `Reset email sent to ${email}. Please check your email.`,
    resetLink,
  };
};

const resetPassword = async (
  userData: IResetPassword,
  decodedUser: JwtPayload,
) => {
  // console.log("user: ", userData);
  // console.log("decodedUser: ", decodedUser);
  if (userData.id !== decodedUser.id) {
    throw new AppError(400, "Id doesn't match");
  }
  const userExisting = await UserModel.findById(userData.id);

  if (!userExisting) {
    throw new AppError(400, "User does not exits");
  }
  if (!userExisting.isVerified) {
    throw new AppError(400, "User is not verified");
  }
  // deny if user is suspended, blocked, or deactivate(deleted)
  if (userExisting.accountStatus !== "active") {
    throw new AppError(400, "User is not active");
  }

  const compare = verifyPassword(userData.password, userExisting.password);

  if (compare) {
    throw new AppError(400, "You are giving old Password!");
  }

  const hashedPassword = hashPassword(userData.password);

  await UserModel.findByIdAndUpdate(
    userData.id,
    {
      password: hashedPassword,
    },
    { new: true },
  );

  return null;
};

const changePassword = async (
  userData: IChangePassword,
  decodedUser: JwtPayload,
) => {
  // console.log("user: ", userData);
  // console.log("decodedUser: ", decodedUser);
  if (userData.id !== decodedUser.id) {
    throw new AppError(400, "Id doesn't match");
  }
  const userExisting = await UserModel.findById(userData.id);

  if (!userExisting) {
    throw new AppError(400, "User does not exits");
  }
  if (!userExisting.isVerified) {
    throw new AppError(400, "User is not verified");
  }
  // deny if user is suspended, blocked, or deactivate(deleted)
  if (userExisting.accountStatus !== "active") {
    throw new AppError(400, "User is not active");
  }
  const compareOld = verifyPassword(
    userData.oldPassword,
    userExisting.password,
  );

  if (!compareOld) {
    throw new AppError(400, "Your old password does not match!");
  }

  const compare = verifyPassword(userData.password, userExisting.password);

  if (compare) {
    throw new AppError(400, "You are giving old Password, give new password!");
  }

  const hashedPassword = hashPassword(userData.password);

  await UserModel.findByIdAndUpdate(
    userData.id,
    {
      password: hashedPassword,
    },
    { new: true },
  );

  return null;
};

export const AuthServices = {
  login,
  reissueAccessToken,
  forgetPassword,
  resetPassword,
  changePassword,
};
