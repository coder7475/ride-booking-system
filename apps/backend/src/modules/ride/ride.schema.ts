import { RideStatus } from "@/types/types";
import { LocationSchema } from "@/types/zod/schemas";
import { z } from "zod";

export const RideSchema = z.object({
  ride_id: z.string(),
  rider_id: z.string(),
  driver_id: z.string(),
  ride_status: z.nativeEnum(RideStatus),
  pickup_location: LocationSchema,
  destination_location: LocationSchema,
  transaction_id: z.string(),
  fare_estimated: z.number(),
  fare_final: z.number(),
  createdAt: z.date(),
  timestamps: z.record(z.string(), z.date()),
});

export type RideZodType = z.infer<typeof RideSchema>;
