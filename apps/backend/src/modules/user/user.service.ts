import AppError from "@/configs/AppError";
import { AuthProviderNames, IAuthProvider } from "@/types/types";
import { hashPassword } from "@repo/utils";

import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: Partial<IUser>): Promise<any> => {
  const { email, password, ...data } = userData;
  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    throw new AppError(400, "User Already Exist");
  }

  // hash the password before creating user
  const hashedPassword = hashPassword(password!, 12);
  const authProvider: IAuthProvider = {
    provider: AuthProviderNames.LOCAL,
    providerId: email as string,
  };

  const user = await UserModel.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...data,
  });

  return user;
};

export const userService = {
  createUser,
};
