import Joi from "joi";
import { JudicialNotaryType } from "../types/judicial-notary.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialNotarySchema = Joi.object<
  Omit<JudicialNotaryType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialNotarySchema = Joi.object<
  Omit<JudicialNotaryType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialNotaryByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialNotaryByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialNotarySchema,
  updateJudicialNotarySchema,
  getJudicialNotaryByCHBSchema,
  getJudicialNotaryByIDSchema,
};