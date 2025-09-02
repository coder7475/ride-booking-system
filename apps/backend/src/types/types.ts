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

export interface IVehicleInfo {
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
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

export interface IRideStatusTimestamps {
  requested?: string;
  accepted?: string;
  started?: string;
  inTransit?: string;
  completed?: string;
  canceled?: string;
}
// transactions
export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentGateway {
  STRIPE = "STRIPE",
  PAYPAL = "PAYPAL",
  CASH = "CASH",
  SSLCOMMERZ = "SSLCOMMERZ",
}

export type FareConfig = {
  baseFare: number;
  perKmRate: number;
  minimumFare?: number;
};
