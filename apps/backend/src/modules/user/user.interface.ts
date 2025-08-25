import type { AccountStatus, IAuthProvider, Role } from "@/types/types";

export interface IUser {
  userName: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  isVerified: boolean;
  accountStatus: AccountStatus;
  authProviders: IAuthProvider[];
  createdAt: Date;
  updatedAt: Date;
}
