export interface IResetPassword {
  id: string;
  password: string;
}

export interface IChangePassword {
  id: string;
  oldPassword: string;
  password: string;
}
