import { checkAuth } from "@/middlewares/CheckAuth";
import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

import { TransactionAuthController } from "./transaction.controller";
import { TransactionSchema } from "./transaction.schema";

const transactionsRouter: Router = Router();

transactionsRouter.patch(
  "/pay",
  validateZod(TransactionSchema),
  checkAuth(Role.USER),
  TransactionAuthController.processPayment,
);

export default transactionsRouter;
