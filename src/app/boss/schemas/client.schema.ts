import Joi from "joi";
import { ClientType } from "../types/client.type";

const id = Joi.number();
const code = Joi.string().min(1).max(50);
const createdAt = Joi.date();

const createClientSchema = Joi.object<ClientType, true>({
  id: id.required(),
  code: code.required(),
  createdAt: createdAt.optional(),
});

const getClientSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createClientSchema, getClientSchema };
