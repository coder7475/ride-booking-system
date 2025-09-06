export interface IResetPassword {
  id: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  password: string;
}
