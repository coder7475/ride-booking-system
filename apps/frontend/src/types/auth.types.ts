// User
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  DRIVER = "DRIVER",
}

export enum AccountStatus {
  ACTIVE = "active",
  PENDING = "pending",
  SUSPENDED = "suspended",
  BLOCKED = "blocked",
  DEACTIVATED = "deactivated",
}

export enum AuthProviderNames {
  LOCAL = "local",
  GOOGLE = "google",
}

export interface IAuthProvider {
  provider: AuthProviderNames;
  providerId: string;
}

// otp
export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

