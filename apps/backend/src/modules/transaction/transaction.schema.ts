import { PaymentGateway } from "@/types/types";
import { z } from "zod";

export const TransactionSchema = z.object({
  rideId: z.string(),
  paymentGateway: z.nativeEnum(PaymentGateway),
});

export type TransactionZodType = z.infer<typeof TransactionSchema>;
