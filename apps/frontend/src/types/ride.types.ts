export interface IRide {
  _id: string;
  riderId: string;
  driverId?: string;
  rideStatus: RideStatus;
  pickupLocation: ILocation;
  destinationLocation: ILocation;
  transactionId: string;
  fareEstimated: number;
  fareFinal: number;
  timestamps: IRideStatusTimestamps;
}

export enum RideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IRideStatusTimestamps {
  requested?: string;
  accepted?: string;
  started?: string;
  inTransit?: string;
  completed?: string;
  canceled?: string;
}

export interface AddressCacheState {
  [key: string]: string; // "lat,long" -> "Human readable address"
}

export interface RideState {
  rides: IRide[];
  addressCache: AddressCacheState;
  loading: boolean;
  error: string | null;
}
