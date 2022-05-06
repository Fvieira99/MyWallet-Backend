import Joi from "joi";

const transactionSchema = Joi.object({
	value: Joi.string().min(1).required(),
	description: Joi.string().min(1).required(),
});

export default transactionSchema;
