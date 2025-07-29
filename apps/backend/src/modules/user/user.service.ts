import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: IUser): Promise<any> => {
  return await User.create(userData);
};

export const userService = {
  createUser,
};
