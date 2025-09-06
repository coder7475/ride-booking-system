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

// Password change form
export const passwordSchema = z
  .object({
    current: z.string().min(1, "Current password is required"),
    new: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    confirm: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.new === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
