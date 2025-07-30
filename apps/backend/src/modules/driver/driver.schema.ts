import { DriverApprovalStatus, DriverOnlineStatus } from "@/types/types";
import { z } from "zod";

export const DriverSchema = z.object({
  driver_id: z.string(),
  user_id: z.string(),
  approval_status: z.nativeEnum(DriverApprovalStatus),
  online_status: z.nativeEnum(DriverOnlineStatus),
  driver_location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  vehicle_info: z.string(),
});

export type DriverZodType = z.infer<typeof DriverSchema>;
