import database from "../db.js";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";
import dayjs from "dayjs";

export async function getTransactions(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.sendStatus(404);

	try {
		const session = await database.collection("sessions").findOne({ token });
		if (!session) return res.status(404).send("Sessão não encontrada");

		const transactions = await database
			.collection("transactions")
			.find({ userId: session.userId })
			.toArray();

		if (transactions.length > 0) {
			transactions.forEach((transaction) => delete transaction.userId);
		}
		res.send(transactions);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function postNewEntry(req, res) {
	const { value, description } = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.sendStatus(404);

	try {
		const session = await database.collection("sessions").findOne({ token });
		if (!session) return res.status(404).send("Sessão não encontrada.");

		const user = await database
			.collection("users")
			.findOne({ _id: new ObjectId(session.userId) });

		if (!user) return res.status(404).send("Usuario não encontrado");

		await database.collection("transactions").insertOne({
			value: parseFloat(value).toFixed(2),
			type: "entry",
			date: dayjs().locale("pt-br").format("DD/MM"),
			description: stripHtml(description).trim(),
			userId: user._id,
		});
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function postNewExit(req, res) {
	const { value, description } = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.sendStatus(404);

	try {
		const session = await database.collection("sessions").findOne({ token });
		if (!session) return res.status(404).send("Sessão não encontrada.");

		const user = await database
			.collection("users")
			.findOne({ _id: new ObjectId(session.userId) });

		if (!user) return res.status(404).send("Usuario não encontrado");

		await database.collection("transactions").insertOne({
			value: parseFloat(value).toFixed(2) * -1,
			type: "exit",
			date: dayjs().locale("pt-br").format("DD/MM"),
			description: stripHtml(description).trim(),
			userId: user._id,
		});
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
