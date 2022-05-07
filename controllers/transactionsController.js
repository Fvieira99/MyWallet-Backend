import database from "../db.js";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";
import dayjs from "dayjs";

export async function getTransactions(req, res) {
	const token = res.locals.token;

	try {
		const session = await database.collection("sessions").findOne({ token });

		const transactions = await database
			.collection("transactions")
			.find({ userId: session.userId })
			.toArray();
		let balance = 0;
		if (transactions.length > 0) {
			transactions.forEach((transaction) => {
				balance += transaction.value;
				delete transaction.userId;
				delete transaction._id;
			});
		}
		res.send({ transactions, balance });
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function postNewEntry(req, res) {
	const { value, description } = req.body;
	const token = res.locals.token;

	try {
		const session = await database.collection("sessions").findOne({ token });

		await database.collection("transactions").insertOne({
			value: parseFloat(value) * 1,
			type: "entry",
			date: dayjs().locale("pt-br").format("DD/MM"),
			description: stripHtml(description).result.trim(),
			userId: session.userId,
		});
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function postNewExit(req, res) {
	const { value, description } = req.body;
	const token = res.locals.token;

	try {
		const session = await database.collection("sessions").findOne({ token });

		await database.collection("transactions").insertOne({
			value: parseFloat(value) * -1,
			type: "exit",
			date: dayjs().locale("pt-br").format("DD/MM"),
			description: stripHtml(description).result.trim(),
			userId: session.userId,
		});
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
