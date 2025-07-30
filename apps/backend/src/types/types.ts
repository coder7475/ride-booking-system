export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

export enum AccountStatus {
  ACTIVE = "active",
  PENDING = "pending",
  SUSPENDED = "suspended",
  BLOCKED = "blocked",
}

export enum AuthProviderNames {
  LOCAL = "local",
  GOOGLE = "google",
}

export interface IAuthProvider {
  provider: AuthProviderNames;
  providerId: string;
}
