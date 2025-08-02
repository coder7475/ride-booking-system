import { Router } from "express";
import { checkAuth } from "@/middlewares/CheckAuth";
import { Role } from "@/types/types";

const TransactionsRouter: Router = Router();

// Process ride payment
TransactionsRouter.patch(
	"/pay",
	//   validateZod(TransactionSchema),
	checkAuth(Role.USER),
	//   TransactionsController.processPayment,
);

export default TransactionsRouter;
