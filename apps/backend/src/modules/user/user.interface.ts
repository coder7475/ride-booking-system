import { AccountStatus, IAuthProvider, Role } from "@/types/types";
import { Types } from "mongoose";

export interface IUser {
  user_name: string;
  email: string;
  password: string;
  role: Role;
  account_status: AccountStatus;
  auth_providers: IAuthProvider[];
  createdAt: Date;
  updatedAt: Date;
}
