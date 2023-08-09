import Joi from "joi";
import { NegotiationType } from "../types/negotiation.type";

const id = Joi.number();
const name = Joi.string().min(1).max(100);
const createAt = Joi.date();
const customerHasBankId = Joi.number();

const page = Joi.number().required().messages({
  "number.base": "El campo page es inválido",
  "any.required": "El campo page es requerido.",
});

const limit = Joi.number().required().messages({
  "number.base": "El campo limit es inválido",
  "any.required": "El campo limit es requerido.",
});

const createNegotiationSchema = Joi.object<Omit<NegotiationType, "id">, true>({
  name: name.required(),
  createdAt: createAt.optional(),
  customerHasBankId: customerHasBankId.required(),
});

const getNegotiationSchemaQuery = Joi.object({
  page,
  limit,
});

const updateNegotiationSchema = Joi.object<Omit<NegotiationType, "id">, true>({
  name: name,
  createdAt: createAt,
  customerHasBankId: customerHasBankId.required(),
});

const getNegotiationSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getNegotiationByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: id.required(),
});

export default {
  createNegotiationSchema,
  getNegotiationSchemaQuery,
  updateNegotiationSchema,
  getNegotiationSchema,
  getNegotiationByCHBSchema,
};
