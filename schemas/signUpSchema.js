import Joi from "joi";

const signUpSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(1).required(),
	confirmation: Joi.ref("password"),
});

export default signUpSchema;
