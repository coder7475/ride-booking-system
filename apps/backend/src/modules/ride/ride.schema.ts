import { RideStatus } from "@/types/types";
import {
  LocationSchema,
  rideStatusTimestampsSchema,
} from "@/types/zod/schemas";
import { z } from "zod";

export const RideSchema = z.object({
  rider_id: z.string(),
  driver_id: z.string(),
  ride_status: z.nativeEnum(RideStatus),
  pickup_location: LocationSchema,
  destination_location: LocationSchema,
  transaction_id: z.string().optional(),
  fare_estimated: z.number(),
  fare_final: z.number().optional(),
  timestamps: rideStatusTimestampsSchema,
});

export type RideZodType = z.infer<typeof RideSchema>;
