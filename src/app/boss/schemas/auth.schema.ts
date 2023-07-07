import Joi from "joi";
import { LoginType } from "../types/auth.type";

const email = Joi.string().email().required();
const password = Joi.string().required();
const id = Joi.number().required().min(1);

const loginSchema = Joi.object<LoginType>({
  email,
  password,
  id,
})

export default { loginSchema };
