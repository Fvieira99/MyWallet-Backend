import database from "../db.js";
import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";
import { v4 } from "uuid";

export async function signUp(req, res) {
	const { password, name, email } = req.body;

	const hashedPassword = bcrypt.hashSync(password, 10);

	try {
		const user = await database.collection("users").findOne({ email });
		if (user) {
			res.status(400).send("Usuário já existe.");
			return;
		}
		await database.collection("users").insertOne({
			name: stripHtml(name).result.trim(),
			email: stripHtml(email).result.trim(),
			password: hashedPassword,
		});
		res.status(200).send("Usuário criado com sucesso!");
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function signIn(req, res) {
	const { email, password } = req.body;

	try {
		const user = await database.collection("users").findOne({ email });
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = v4();
			await database.collection("sessions").insertOne({
				userId: user._id,
				token,
			});

			delete user.password;
			delete user._id;
			res.status(200).send({ ...user, token });
		} else {
			return res
				.status(422)
				.send(
					"Usuário não existe ou os campos não foram preenchidos corretamente"
				);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function logout(req, res) {
	const token = res.locals.token;

	try {
		await database.collection("sessions").findOneAndDelete({ token });

		res.status(200).send("Logout realizado com sucesso");
	} catch (error) {
		res.sendStatus(500);
	}
}
