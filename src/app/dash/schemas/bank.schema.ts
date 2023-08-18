import Joi from "joi";
import { BankType } from "../types/bank.type";

const id = Joi.number();
const name = Joi.string().min(1).max(100);
const description = Joi.string();
const state = Joi.boolean();
const createAt = Joi.date();

const createBankSchema = Joi.object<Omit<BankType, "id">, true>({
  name: name.required(),
  description: description.optional(),
  state: state.required(),
  createdAt: createAt.optional(),
});

const updateBankSchema = Joi.object<Omit<BankType, "id">, true>({
  name: name,
  description: description,
  state: state,
  createdAt: createAt,
});

const getBankSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createBankSchema, updateBankSchema, getBankSchema };
