import { Router } from "express";
import {
	getTransactions,
	postNewEntry,
	postNewExit,
} from "../controllers/transactionsController.js";
import validToken from "../middlewares/tokenMiddleware.js";
import validTransaction from "../middlewares/transactionMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.use(validToken);

transactionsRouter.get("/transactions", getTransactions);

transactionsRouter.post("/transaction/entry", validTransaction, postNewEntry);

transactionsRouter.post("/transaction/exit", validTransaction, postNewExit);

export default transactionsRouter;
