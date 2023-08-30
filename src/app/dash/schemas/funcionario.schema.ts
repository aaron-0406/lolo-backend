import Joi from "joi";
import { FuncionarioType } from "../types/funcionario.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
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

const createFuncionarioSchema = Joi.object<Omit<FuncionarioType, "id">, true>({
  name: name.required(),
  createdAt: createAt.optional(),
  customerHasBankId: customerHasBankId.required(),
});

const updateFuncionarioSchema = Joi.object<Omit<FuncionarioType, "id">, true>({
  name: name,
  customerHasBankId: customerHasBankId.required(),
  createdAt: createAt,
});

const getFuncionarioSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getFuncionarioByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: id.required(),
});

const getFuncionarioByCHBSchemaQuery = Joi.object({
  page,
  limit,
}).options({ abortEarly: true });

export default {
  createFuncionarioSchema,
  updateFuncionarioSchema,
  getFuncionarioSchema,
  getFuncionarioByCHBSchema,
  getFuncionarioByCHBSchemaQuery,
};
