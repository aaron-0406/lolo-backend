import Joi from "joi";
import { CustomerType } from "../types/customer.type";

const id = Joi.number();
const ruc = Joi.string().min(11);
const companyName = Joi.string().min(2).max(150);
const description = Joi.string();
const createAt = Joi.date();

const createCustomerSchema = Joi.object<CustomerType, true>({
  id: id.required(),
  ruc: ruc.required(),
  companyName: companyName.required(),
  description: description.optional(),
  createAt: createAt.optional(),
});

const getCustomerSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createCustomerSchema, getCustomerSchema };