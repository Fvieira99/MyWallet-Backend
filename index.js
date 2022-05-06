//Dependencies
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
//Modules
import database from "./db.js";
import { signUp, signIn } from "./controllers/authController.js";
import {
	getTransactions,
	postNewEntry,
	postNewExit,
} from "./controllers/transactionsController.js";
dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.post("/signin", signIn);

server.post("/signup", signUp);

server.get("/transactions", getTransactions);

server.post("/transaction/entry", postNewEntry);

server.post("/transaction/exit", postNewExit);

const port = process.env.PORT;
server.listen(port, () =>
	console.log(chalk.green.bold(`Servidor funcionando na porta ${port}`))
);
