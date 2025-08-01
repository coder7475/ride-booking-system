import AppError from "@/configs/AppError";
import { env } from "@/configs/envConfig";
import { AccountStatus, AuthProviderNames, IAuthProvider } from "@/types/types";
import { hashPassword } from "@repo/utils";

import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const { email, password, ...data } = userData;
  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    throw new AppError(400, "User Already Exist");
  }

  const hashedPassword = hashPassword(password!, env.PASSWORD_HASH_SALT);

  const authProvider: IAuthProvider = {
    provider: AuthProviderNames.LOCAL,
    providerId: email!,
  };

  const user: Partial<IUser> = {
    email,
    password: hashedPassword,
    authProviders: [authProvider],
    ...data,
  };

  return await UserModel.create(user);
};

const updateUserById = async (userId: string, updateData: Partial<IUser>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true, select: "-password" },
  );

  return updatedUser;
};

const findUserById = async (userId: string) => {
  return await UserModel.findById(userId).select("-password");
};

const deleteUser = async (userId: string) => {
  const updateData = {
    accountStatus: AccountStatus.DEACTIVATED,
  };
  const deletedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true, select: "-password" },
  );

  return deletedUser;
};

export const UserServices = {
  createUser,
  findUserById,
  updateUserById,
  deleteUser,
};
