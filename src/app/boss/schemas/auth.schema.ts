import Joi from "joi";
import { LoginType } from "../types/auth.type";

const email = Joi.string().email().required();
const password = Joi.string().required();

const loginSchema = Joi.object<LoginType>({
  email,
  password,
})

export default { loginSchema };
