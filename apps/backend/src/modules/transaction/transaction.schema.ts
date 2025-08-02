import { z } from "zod";
import { PaymentGateway, PaymentStatus } from "@/types/types";

export const TransactionSchema = z.object({
	transaction_id: z.string(),
	amount: z.number().nonnegative(),
	payment_status: z.nativeEnum(PaymentStatus),
	payment_gateway: z.nativeEnum(PaymentGateway),
});

export type TransactionZodType = z.infer<typeof TransactionSchema>;
