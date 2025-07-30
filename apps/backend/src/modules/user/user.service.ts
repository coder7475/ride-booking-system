import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: IUser): Promise<any> => {
  return await UserModel.create(userData);
};

export const userService = {
  createUser,
};
