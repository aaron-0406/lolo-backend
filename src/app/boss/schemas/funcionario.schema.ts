import Joi from "joi";
import { FuncionarioType } from "../types/funcionario.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const createAt = Joi.date();

const createFuncionarioSchema = Joi.object<FuncionarioType, true>({
  id: id.required(),
  name: name.required(),
  createdAt: createAt.optional(),
});

const getFuncionarioSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createFuncionarioSchema, getFuncionarioSchema };
