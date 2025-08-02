import { checkAuth } from "@/middlewares/CheckAuth";
import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

import { TransactionAuthController } from "./transaction.controller";
import { TransactionSchema } from "./transaction.schema";

const TransactionsRouter: Router = Router();

TransactionsRouter.patch(
  "/pay",
  validateZod(TransactionSchema),
  checkAuth(Role.USER),
  TransactionAuthController.processPayment,
);

export default TransactionsRouter;
