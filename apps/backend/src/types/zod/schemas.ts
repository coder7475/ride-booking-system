import { z } from "zod";

export const LocationSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
});

export const rideStatusTimestampsSchema = z.object({
	requested: z.string().optional(),
	accepted: z.string().optional(),
	started: z.string().optional(),
	completed: z.string().optional(),
	canceled: z.string().optional(),
});
