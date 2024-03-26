import Joi from "joi";
import { GuarantorType } from "../types/guarantor.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const phone = Joi.string().max(150);
const email = Joi.string().max(150);
const createdAt = Joi.date();
const clientId = Joi.number();
const visible = Joi.boolean();

const createGuarantorSchema = Joi.object<Omit<GuarantorType, "id">, true>({
  name: name.required(),
  phone: phone.optional().empty("").allow(""),
  email: email.optional().empty("").allow(""),
  createdAt: createdAt.optional(),
  clientId: clientId.required(),
});

const updateGuarantorSchema = Joi.object<
  Omit<GuarantorType, "id" | "clientId">,
  true
>({
  name: name.required(),
  phone: phone.optional().empty("").allow(""),
  email: email.optional().empty("").allow(""),
  createdAt: createdAt.optional(),
});

const getGuarantorByClientIDSchema = Joi.object<{ clientId: number }, true>({
  clientId: clientId.required(),
});

const getGuarantorByClientIDSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

const getGuarantorByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createGuarantorSchema,
  updateGuarantorSchema,
  getGuarantorByClientIDSchema,
  getGuarantorByIDSchema,
  getGuarantorByClientIDSchemaQuery,
};
