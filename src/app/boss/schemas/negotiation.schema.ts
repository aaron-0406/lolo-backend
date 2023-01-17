import Joi from "joi";
import { NegotiationType } from "../types/negotiation.type";

const id = Joi.number();
const name = Joi.string().min(1).max(100);
const createAt = Joi.date();
const customerHasBankId = Joi.number();

const createNegotiationSchema = Joi.object<Omit<NegotiationType, "id">, true>({
  name: name.required(),
  createdAt: createAt.optional(),
  customerHasBankId: customerHasBankId.required(),
});

const updateNegotiationSchema = Joi.object<Omit<NegotiationType, "id">, true>({
  name: name,
  createdAt: createAt,
  customerHasBankId: customerHasBankId.required(),
});

const getNegotiationSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createNegotiationSchema,
  updateNegotiationSchema,
  getNegotiationSchema,
};
