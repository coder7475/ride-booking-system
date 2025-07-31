import { RideStatus } from "@/types/types";
import {
  LocationSchema,
  rideStatusTimestampsSchema,
} from "@/types/zod/schemas";
import { z } from "zod";

export const RideSchema = z.object({
  riderId: z.string(),
  driverId: z.string().optional(),
  rideStatus: z.nativeEnum(RideStatus),
  pickupLocation: LocationSchema,
  destinationLocation: LocationSchema,
  transactionId: z.string().optional(),
  fareEstimated: z.number(),
  fareFinal: z.number().optional(),
  timestamps: rideStatusTimestampsSchema,
});

export type RideZodType = z.infer<typeof RideSchema>;
