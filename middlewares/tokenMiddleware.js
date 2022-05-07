import database from "../db.js";

export default async function validToken(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.sendStatus(404);
	try {
		const session = await database.collection("sessions").findOne({ token });
		if (!session) return res.status(404).send("Sessão não encontrada");

		const user = await database
			.collection("users")
			.findOne({ _id: session.userId });
		if (!user) return res.status(404).send("Usuário não encontrado");

		res.locals.token = token;
		next();
	} catch (error) {
		res.status(500).send(error);
	}
}
