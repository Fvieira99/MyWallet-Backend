import signInSchema from "../schemas/signInSchema.js";

export default async function validSignIn(req, res, next) {
	const validation = signInSchema.validate(req.body, { abortEarly: false });

	if (validation.error) {
		return res
			.status(422)
			.send(validation.error.details.map((detail) => detail.message));
	}

	next();
}
