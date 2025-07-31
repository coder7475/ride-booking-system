import AppError from "@/configs/AppError";
import { AuthProviderNames, IAuthProvider } from "@/types/types";
import { hashPassword } from "@repo/utils";

import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const { email, password, ...data } = userData;
  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    throw new AppError(400, "User Already Exist");
  }

  const hashedPassword = hashPassword(password!, 12);

  const authProvider: IAuthProvider = {
    provider: AuthProviderNames.LOCAL,
    providerId: email!,
  };

  const user: Partial<IUser> = {
    email,
    password: hashedPassword,
    auth_providers: [authProvider],
    ...data,
  };

  return await UserModel.create(user);
};

const findUserById = async (userId: string) => {
  return await UserModel.findById(userId).select("-password");
};

export const UserServices = {
  createUser,
  findUserById,
};
