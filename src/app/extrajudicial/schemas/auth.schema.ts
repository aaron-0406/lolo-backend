import Joi from "joi";
import { ChangeCredentialsType, ChangePasswordType, LoginType } from "../types/auth.type";

const email = Joi.string().email().required();
const password = Joi.string().required();
const newPassword = Joi.string().required();
const repeatPassword = Joi.string().required();
const name = Joi.string().required();
const lastname = Joi.string().required();
const dni = Joi.string().required().max(8);
const phone = Joi.string().required();
const customerId = Joi.number().required().min(1);

const loginSchema = Joi.object<LoginType>({
  email,
  password,
  customerId,
}).options({ abortEarly: true });

const changePasswordSchema = Joi.object<ChangePasswordType>({
  newPassword,
  repeatPassword,
}).options({ abortEarly: true });

const changeCredentialsSchema = Joi.object<ChangeCredentialsType>({
  name,
  lastname,
  dni,
  phone,
}).options({ abortEarly: true });

export default { loginSchema, changePasswordSchema, changeCredentialsSchema };
