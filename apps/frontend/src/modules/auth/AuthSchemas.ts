import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters",
      })
      .max(50),
    lastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters",
      })
      .max(50),
    email: z.string().email(),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, { message: "Phone number is too long" }),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is too short" }),
    role: z.enum(["USER", "DRIVER"]).refine((val) => !!val, {
      message: "Please select whether you want to be a rider or driver",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
