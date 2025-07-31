import { DriverApprovalStatus, DriverOnlineStatus } from "@/types/types";
import { LocationSchema } from "@/types/zod/schemas";
import { z } from "zod";

export const VehicleInfoSchema = z.object({
  vehicleType: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().gte(1900).lte(new Date().getFullYear()),
  plateNumber: z.string().min(1),
});

export const CreateDriverSchema = z.object({
  driverLocation: LocationSchema,
  vehicleInfo: VehicleInfoSchema,
});

export const UpdateDriverSchema = z.object({
  approvalStatus: z.nativeEnum(DriverApprovalStatus).optional(),
  onlineStatus: z.nativeEnum(DriverOnlineStatus).optional(),
  driverLocation: LocationSchema.optional(),
  vehicleInfo: VehicleInfoSchema.partial().optional(),
});

export type DriverZodType = z.infer<typeof CreateDriverSchema>;
export type UpdateDriverZodType = z.infer<typeof UpdateDriverSchema>;
