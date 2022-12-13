import Joi from "joi";
import { BankType } from "../types/bank.type";

const id = Joi.number();
const name = Joi.string().min(1).max(100);
const description = Joi.string();
const state = Joi.boolean();
const createAt = Joi.date();

const createBankSchema = Joi.object<BankType, true>({
  id: id.required(),
  name: name.required(),
  description: description.optional(),
  state: state.required(),
  createdAt: createAt.optional(),
});

const getBankSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createBankSchema, getBankSchema };
