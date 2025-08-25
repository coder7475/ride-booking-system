// User
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  DRIVER = "DRIVER",
}

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
