//Dependencies
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
//Modules
import authRouter from "./routes/authRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";

dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.use(authRouter);
server.use(transactionsRouter);

const port = process.env.PORT || 5000;
server.listen(port, () =>
	console.log(chalk.green.bold(`Servidor funcionando na porta ${port}`))
);
