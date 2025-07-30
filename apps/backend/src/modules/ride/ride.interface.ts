import { ILocation, RideStatus, RideStatusTimestamps } from "@/types/types";

export interface IRide {
  ride_id: string;
  rider_id: string;
  driver_id: string;
  ride_status: RideStatus;
  pickup_location: ILocation;
  destination_location: ILocation;
  transaction_id: string;
  fare_estimated: number;
  fare_final: number;
  createdAt: Date;
  timestamps: RideStatusTimestamps;
}
