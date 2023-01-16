import Joi from "joi";

const email = Joi.string().email().required();
const password = Joi.string().required();

const loginSchema = Joi.object({
  email,
  password,
}).options({ abortEarly: true });;

export default { loginSchema };
