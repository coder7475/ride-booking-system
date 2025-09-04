import type { ComponentType } from "react";

import type { AccountStatus, IAuthProvider, Role } from "./auth.types";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarRoutes {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface IUser {
  userName: string;
  email: string;
  password?: string;
  phone: string;
  role: Role;
  isVerified: boolean;
  accountStatus: AccountStatus;
  authProviders: IAuthProvider[];
  createdAt?: string;
  updatedAt?: string;
}
