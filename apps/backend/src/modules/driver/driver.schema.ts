import { DriverApprovalStatus, DriverOnlineStatus } from "@/types/types";
import { LocationSchema } from "@/types/zod/schemas";
import { z } from "zod";

export const DriverSchema = z.object({
  driver_id: z.string(),
  user_id: z.string(),
  approval_status: z.nativeEnum(DriverApprovalStatus),
  online_status: z.nativeEnum(DriverOnlineStatus),
  driver_location: LocationSchema,
  vehicle_info: z.string(),
});

export type DriverZodType = z.infer<typeof DriverSchema>;
