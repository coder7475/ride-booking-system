import { AccountStatus, AuthProviderNames, Role } from "@/types/types";
import { z } from "zod";

export const AuthProviderSchema = z.object({
  provider: z.nativeEnum(AuthProviderNames),
  providerId: z.string().min(1),
});

export const UserSchema = z.object({
  user_name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  role: z.nativeEnum(Role),
  account_status: z.nativeEnum(AccountStatus),
  auth_providers: z.array(AuthProviderSchema).min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});
