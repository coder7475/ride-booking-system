import { z } from "zod";

import { Role } from "../../types/types";

export const CreateUserSchema = z.object({
  userName: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number is too long" }),
  role: z.nativeEnum(Role),
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message: "Password must contain at least 1 special character.",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least 1 number.",
    }),
});

export const UpdateUserSchema = CreateUserSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided for update.",
  },
);
