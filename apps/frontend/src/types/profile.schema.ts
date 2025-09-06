import z from "zod";

// Profile form schema and setup
export const profileSchema = z.object({
  userName: z.string().min(2, "Full Name is required"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long"),
  email: z.string().email("Invalid email address"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
