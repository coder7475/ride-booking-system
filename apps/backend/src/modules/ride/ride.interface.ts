import type {
	ILocation,
	IRideStatusTimestamps,
	RideStatus,
} from "@/types/types";

export interface IRide {
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
