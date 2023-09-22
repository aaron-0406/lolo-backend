import Joi from "joi";
import { CustomerUserType } from "../types/customer-user.type";

const id = Joi.number();
const name = Joi.string().min(2).max(100);
const lastName = Joi.string().min(2).max(100);
const phone = Joi.string().min(2).max(50);
const dni = Joi.string().max(8);
const email = Joi.string().min(2).max(70);
const password = Joi.string().min(2).max(70);
const state = Joi.boolean();
const createAt = Joi.date();
const customerId = Joi.number();
const roleId = Joi.number().integer().min(1);

const createCustomerUserSchema = Joi.object<
  Omit<CustomerUserType, "id" | "permissions" | "loginAttempts">,
  true
>({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  dni: dni.optional(),
  email: email.required(),
  password: password.required(),
  state: state.required(),
  createdAt: createAt.optional(),
  customerId: customerId.required(),
  roleId: roleId.required(),
});

const updateCustomerUserStateSchema = Joi.object<{ state: boolean }, true>({
  state: state.required(),
});

const updateCustomerUserSchema = Joi.object<
  Omit<
    CustomerUserType,
    "id" | "email" | "customerId" | "createdAt" | "permissions" | "loginAttempts"
  >,
  true
>({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  dni: dni.optional(),
  state: state.required(),
  password: password.optional(),
  roleId: roleId.required(),
});

const getCustomerUserSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getCustomerUserByIdSchema = Joi.object<{ customerId: number }, true>({
  customerId: customerId.required(),
});

export default {
  createCustomerUserSchema,
  updateCustomerUserSchema,
  getCustomerUserSchema,
  getCustomerUserByIdSchema,
  updateCustomerUserStateSchema,
};
