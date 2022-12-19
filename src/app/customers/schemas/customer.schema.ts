import Joi from "joi";
import { CustomerType } from "../types/customer.type";

const id = Joi.number();
const ruc = Joi.string().min(11);
const companyName = Joi.string().min(2).max(150);
const urlIdentifier = Joi.string().min(1).max(100);
const description = Joi.string();
const state = Joi.boolean();
const createAt = Joi.date();

const createCustomerSchema = Joi.object<CustomerType, true>({
  id: id.required(),
  ruc: ruc.required(),
  companyName: companyName.required(),
  urlIdentifier: urlIdentifier.required(),
  description: description.optional(),
  state: state.required(),
  createdAt: createAt.optional(),
});

const getCustomerSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createCustomerSchema, getCustomerSchema };
