import Joi from "joi";
import { CustomerType } from "../types/customer.type";

const id = Joi.number();
const ruc = Joi.string().min(11);
const companyName = Joi.string().min(2).max(150);
const urlIdentifier = Joi.string().min(1).max(100);
const description = Joi.string();
const state = Joi.boolean();
const createAt = Joi.date();
const isScrapperActive = Joi.boolean();

const createCustomerSchema = Joi.object<Omit<CustomerType, "id">, true>({
  ruc: ruc.required(),
  companyName: companyName.required(),
  urlIdentifier: urlIdentifier.required(),
  description: description.optional(),
  state: state.required(),
  createdAt: createAt.optional(),
  isScrapperActive: isScrapperActive.optional(),
});

const updateCustomerSchema = Joi.object<
  Omit<CustomerType, "id" | "createdAt" | "state">,
  true
>({
  ruc: ruc.required(),
  companyName: companyName.required(),
  urlIdentifier: urlIdentifier.required(),
  description: description.optional(),
  isScrapperActive: isScrapperActive.optional(),
});

const updateStateCustomerSchema = Joi.object<{ state: boolean }>({
  state: state.required(),
});

const updateScrapperStateCustomerSchema = Joi.object<{ state: boolean }>({
  state: state.required(),
});

const getCustomerByUrlSchema = Joi.object<{ urlIdentifier: string }, true>({
  urlIdentifier: urlIdentifier.required(),
});

const getCustomerByID = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createCustomerSchema,
  updateCustomerSchema,
  updateStateCustomerSchema,
  getCustomerByUrlSchema,
  getCustomerByID,
  updateScrapperStateCustomerSchema 
};
