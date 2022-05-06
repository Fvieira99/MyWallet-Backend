import database from "../db.js";

export default async function validToken(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.sendStatus(404);

	res.locals.token = token;
	next();
}
