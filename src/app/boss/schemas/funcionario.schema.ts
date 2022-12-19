import Joi from "joi";
import { FuncionarioType } from "../types/funcionario.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const createAt = Joi.date();
const bankId = Joi.number();

const createFuncionarioSchema = Joi.object<Omit<FuncionarioType, "id">, true>({
  name: name.required(),
  createdAt: createAt.optional(),
  bankId: bankId.required(),
});

const updateFuncionarioSchema = Joi.object<Omit<FuncionarioType, "id">, true>({
  name: name,
  bankId: bankId,
  createdAt: createAt,
});

const getFuncionarioSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createFuncionarioSchema,
  updateFuncionarioSchema,
  getFuncionarioSchema,
};
