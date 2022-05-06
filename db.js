import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let database;
const mongoClient = new MongoClient(process.env.MONGO_URL);
console.log(process.env.DB);

try {
	await mongoClient.connect();
	database = mongoClient.db(process.env.DB);
	console.log(chalk.blue.bold("Conexão com o banco de dados estabelecida"));
} catch (error) {
	console.log(chalk.red.bold("Não foi possível conectar ao banco de dados."));
}

export default database;
