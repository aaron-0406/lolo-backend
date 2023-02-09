import Joi from "joi";
import { LoginType } from "../types/auth.type";

const email = Joi.string().email().required();
const password = Joi.string().required();
const customerId = Joi.number().required().min(1);

const loginSchema = Joi.object<LoginType>({
  email,
  password,
  customerId,
}).options({ abortEarly: true });

export default { loginSchema };
