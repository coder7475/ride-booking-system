// User
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

// Driver
export enum DriverOnlineStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  BUSY = "BUSY",
}

export enum DriverApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Ride
export interface ILocation {
  latitude: number;
  longitude: number;
}

export enum RideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export type RideStatusTimestamps = {
  [status in RideStatus]?: Date;
};
