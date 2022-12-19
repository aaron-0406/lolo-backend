import Joi from "joi";
import { GuarantorType } from "../types/guarantor.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const phone = Joi.string().max(150);
const email = Joi.string().max(150);
const createdAt = Joi.date();
const clientID = Joi.number();

const createGuarantorSchema = Joi.object<GuarantorType, true>({
  id: id.required(),
  name: name.required(),
  phone: phone.optional(),
  email: email.optional(),
  createdAt: createdAt.optional(),
  clientID: clientID.required(),
});

const getGuarantorSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createGuarantorSchema, getGuarantorSchema };
