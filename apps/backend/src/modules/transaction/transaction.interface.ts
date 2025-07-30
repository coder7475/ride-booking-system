import { PaymentGateway, PaymentStatus } from "@/types/types";

export interface ITransaction {
  transaction_id: string;
  amount: number;
  payment_status: PaymentStatus;
  payment_gateway: PaymentGateway;
  invoice_url: string;
  createdAt: Date;
  updatedAt: Date;
}
