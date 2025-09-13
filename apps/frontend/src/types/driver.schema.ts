import z from "zod";

// Zod schema for vehicle info (from backend)
export const VehicleInfoSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle type is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number(),
  plateNumber: z.string().min(1, "Plate number is required"),
});

export const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const DriverFormSchema = z.object({
  vehicleInfo: VehicleInfoSchema,
  driverLocation: LocationSchema,
});

export type DriverFormValues = z.infer<typeof DriverFormSchema>;
