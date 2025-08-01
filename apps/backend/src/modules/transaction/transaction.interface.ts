import { PaymentGateway, PaymentStatus } from "@/types/types";

export interface ITransaction {
  transactionId: string;
  amount: number;
  paymentStatus: PaymentStatus;
  paymentGateway: PaymentGateway;
  invoiceUrl: string;
}
