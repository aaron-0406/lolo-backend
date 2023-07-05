import Joi from "joi";
import { LoginType } from "../types/auth.type";

const email = Joi.string().email().required();
const password = Joi.string().required();
const userId = Joi.number().required().min(1);

const loginSchema = Joi.object<LoginType>({
  email,
  password,
  userId,
}).options({ abortEarly: true });

export default { loginSchema };
