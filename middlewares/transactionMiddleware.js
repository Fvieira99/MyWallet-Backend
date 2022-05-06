import transactionSchema from "../schemas/transactionSchema.js";

export default async function validTransaction(req, res, next) {
	const validation = transactionSchema.validate(req.body);

	if (validation.error)
		return res
			.status(422)
			.send(validation.error.details.map((detail) => detail.message));

	next();
}
