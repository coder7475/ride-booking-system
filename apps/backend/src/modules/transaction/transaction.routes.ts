import { checkAuth } from "@/middlewares/CheckAuth";
import { validateZod } from "@/middlewares/ValidateRequest";
import { Role } from "@/types/types";
import { Router } from "express";

const TransactionsRouter: Router = Router();

// Process ride payment
TransactionsRouter.patch(
  "/pay",
  //   validateZod(TransactionSchema),
  checkAuth(Role.USER),
  //   TransactionsController.processPayment,
);

export default TransactionsRouter;
