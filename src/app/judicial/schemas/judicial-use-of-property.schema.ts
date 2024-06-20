import Joi from "joi";
import { JudicialUseOfPropertyType } from "../types/judicial-use-of-property.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialUseOfPropertySchema = Joi.object<
  Omit<JudicialUseOfPropertyType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialUseOfPropertySchema = Joi.object<
  Omit<JudicialUseOfPropertyType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialUseOfPropertyByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialUseOfPropertyByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialUseOfPropertySchema,
  updateJudicialUseOfPropertySchema,
  getJudicialUseOfPropertyByCHBSchema,
  getJudicialUseOfPropertyByIDSchema,
};