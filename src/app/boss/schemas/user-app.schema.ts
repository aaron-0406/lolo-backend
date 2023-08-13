import Joi from "joi";
import { UserAppType } from "../types/user-app";

const id = Joi.number();
const roleId = Joi.number();
const code = Joi.string().min(9).max(9);
const dni = Joi.string().max(8);
const name = Joi.string().min(2).max(100);
const lastName = Joi.string().min(2).max(100);
const address = Joi.string().min(2).max(100);
const phone = Joi.string().min(2).max(50);
const email = Joi.string().min(2).max(70);
const password = Joi.string().min(2).max(70);
const state = Joi.boolean();
const createAt = Joi.date();

const createUserSchema = Joi.object<
  Omit<UserAppType, "id" | "permissions">,
  true
>({
  code: code.required(),
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  dni: dni.required(),
  address: address.optional(),
  email: email.required(),
  password: password.required(),
  state: state.required(),
  roleId: roleId.required(),
  createdAt: createAt.optional(),
});

const updateUserSchema = Joi.object<
  Omit<UserAppType, "id" | "email" | "password" | "createdAt" | "permissions">,
  true
>({
  code: code.required(),
  name: name.required(),
  roleId: roleId.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  dni: dni.required(),
  address: address.optional(),
  state: state.required(),
});

const getUserSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
