import Joi from "joi";
import { ModuleType } from "../types/module.type";

const id = Joi.number();
const name = Joi.string().min(1).max(100);
const description = Joi.string();
const state = Joi.boolean();
const createAt = Joi.date();

const createModuleSchema = Joi.object<ModuleType, true>({
  id: id.required(),
  name: name.required(),
  description: description.optional(),
  state: state.required(),
  createdAt: createAt.optional(),
});

const getModuleSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createModuleSchema, getModuleSchema };
