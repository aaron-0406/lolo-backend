import Joi from "joi";
import { ClientType } from "../types/client.type";

const id = Joi.number();
const code = Joi.string().min(1).max(50);
const state = Joi.string().min(1).max(60);
const dniOrRuc = Joi.string().min(1).max(20);
const name = Joi.string().min(1).max(200);
const salePerimeter = Joi.string();
const phone = Joi.string().min(1).max(300);
const email = Joi.string().min(1).max(300);
const createdAt = Joi.date();
const cityID = Joi.number();
const funcionarioID = Joi.number();
const customerUserID = Joi.number();
const customerID = Joi.number();
const bankID = Joi.number();

const createClientSchema = Joi.object<ClientType, true>({
  id: id.required(),
  code: code.required(),
  state: state.required(),
  dniOrRuc: dniOrRuc.required(),
  name: name.required(),
  salePerimeter: salePerimeter.optional(),
  phone: phone.optional(),
  email: email.optional(),
  createdAt: createdAt.optional(),
  cityID: cityID.required(),
  funcionarioID: funcionarioID.required(),
  customerUserID: customerUserID.required(),
  customerID: customerID.required(),
  bankID: bankID.required(),
});

const getClientSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createClientSchema, getClientSchema };
