import { z } from "zod";

export const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const rideStatusTimestampsSchema = z.object({
  requested: z.date().optional(),
  accepted: z.date().optional(),
  started: z.date().optional(),
  completed: z.date().optional(),
  canceled: z.date().optional(),
});
