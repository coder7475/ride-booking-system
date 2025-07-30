import { PaymentGateway, PaymentStatus } from "@/types/types";
import { Document, model, Schema } from "mongoose";

import { ITransaction } from "./transaction.interface";

export interface ITransactionDocument extends Document, ITransaction {}

const TransactionSchemaMongoose = new Schema<ITransactionDocument>(
  {
    transaction_id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    payment_status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    payment_gateway: {
      type: String,
      enum: Object.values(PaymentGateway),
      required: true,
    },
    invoice_url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

export const TransactionModel = model<ITransactionDocument>(
  "Transaction",
  TransactionSchemaMongoose,
);
