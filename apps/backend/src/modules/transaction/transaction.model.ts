import { PaymentGateway, PaymentStatus } from "@/types/types";
import { Document, model, Schema } from "mongoose";

import { ITransaction } from "./transaction.interface";

export interface ITransactionDocument extends Document, ITransaction {}

const TransactionSchemaMongoose = new Schema<ITransactionDocument>(
  {
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentGateway: {
      type: String,
      enum: Object.values(PaymentGateway),
      default: PaymentGateway.SSLCOMMERZ,
    },
    invoiceUrl: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false },
);

export const TransactionModel = model<ITransactionDocument>(
  "Transaction",
  TransactionSchemaMongoose,
);
