import Joi from "joi";
import { NegotiationType } from "../types/negotiation.type";

const id = Joi.number();
const name = Joi.string().min(1).max(100);
const createAt = Joi.date();

const createNegotiationSchema = Joi.object<Omit<NegotiationType, "id">, true>({
  name: name.required(),
  createdAt: createAt.optional(),
});

const updateNegotiationSchema = Joi.object<Omit<NegotiationType, "id">, true>({
  name: name,
  createdAt: createAt,
});

const getNegotiationSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createNegotiationSchema, updateNegotiationSchema, getNegotiationSchema };
