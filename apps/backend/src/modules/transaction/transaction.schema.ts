import { PaymentGateway, PaymentStatus } from "@/types/types";
import { z } from "zod";

export const TransactionSchema = z.object({
  transaction_id: z.string(),
  amount: z.number().nonnegative(),
  payment_status: z.nativeEnum(PaymentStatus),
  payment_gateway: z.nativeEnum(PaymentGateway),
  invoice_url: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TransactionZodType = z.infer<typeof TransactionSchema>;
