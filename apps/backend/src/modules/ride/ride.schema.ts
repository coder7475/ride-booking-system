import { z } from "zod";
import { RideStatus } from "@/types/types";
import {
	LocationSchema,
	rideStatusTimestampsSchema,
} from "@/types/zod/schemas";

export const CreateRideSchema = z.object({
	pickupLocation: LocationSchema,
	destinationLocation: LocationSchema,
	fareEstimated: z.number(),
	fareFinal: z.number().optional(),
	timestamps: rideStatusTimestampsSchema.optional(),
});
export const UpdateRideSchema = CreateRideSchema.partial().extend({
	driverId: z.string().optional(),
	rideStatus: z.nativeEnum(RideStatus).optional(),
});

export type CreateRideZodType = z.infer<typeof CreateRideSchema>;
export type UpdateRideZodType = z.infer<typeof UpdateRideSchema>;
