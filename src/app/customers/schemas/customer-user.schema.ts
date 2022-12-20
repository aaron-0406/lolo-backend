import Joi from "joi";
import { CustomerUserType } from "../types/customer-user.type";

const id = Joi.number();
const name = Joi.string().min(2).max(100);
const lastName = Joi.string().min(2).max(100);
const phone = Joi.string().min(2).max(50);
const dni = Joi.string().max(8);
const email = Joi.string().min(2).max(70);
const password = Joi.string().min(2).max(70);
const privilege = Joi.string().max(6);
const state = Joi.boolean();
const createAt = Joi.date();
const customerID = Joi.number();

const createCustomerUserSchema = Joi.object<Omit<CustomerUserType, "id">, true>(
  {
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    dni: dni.optional(),
    email: email.required(),
    password: password.required(),
    privilege: privilege.required(),
    state: state.required(),
    createdAt: createAt.optional(),
    customerId: customerID.required(),
  }
);

const updateCustomerUserSchema = Joi.object<
  Omit<CustomerUserType, "id" | "email" | "password" | "customerId">,
  true
>({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  dni: dni.optional(),
  privilege: privilege.required(),
  state: state.required(),
  createdAt: createAt.optional(),
});

const getCustomerUserSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createCustomerUserSchema,
  updateCustomerUserSchema,
  getCustomerUserSchema,
};
