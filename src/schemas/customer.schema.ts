import Joi from "joi";
import { CustomerType } from "../types/customer.type";

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(150);

const createCustomerSchema = Joi.object<CustomerType, true>({
  id: id.required(),
  name: name.required(),
});

const getCustomerSchema = Joi.object<{ id: string }, true>({
  id: id.required(),
});

export default { createCustomerSchema, getCustomerSchema };
