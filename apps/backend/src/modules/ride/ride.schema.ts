import { PaymentGateway, RideStatus } from "@/types/types";
import {
  LocationSchema,
  rideStatusTimestampsSchema,
} from "@/types/zod/schemas";
import { z } from "zod";

export const CreateRideSchema = z.object({
  pickupLocation: LocationSchema,
  destinationLocation: LocationSchema,
  fareEstimated: z.number(),
  fareFinal: z.number().optional(),
  paymentGateway: z.nativeEnum(PaymentGateway),
  timestamps: rideStatusTimestampsSchema.optional(),
});
export const UpdateRideSchema = CreateRideSchema.partial().extend({
  driverId: z.string().optional(),
  rideStatus: z.nativeEnum(RideStatus).optional(),
});

export type CreateRideZodType = z.infer<typeof CreateRideSchema>;
export type UpdateRideZodType = z.infer<typeof UpdateRideSchema>;
