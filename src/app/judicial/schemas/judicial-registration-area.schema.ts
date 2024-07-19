import Joi from "joi";
import { JudicialRegistrationAreaType } from "../types/judicial-registration-area.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialRegistrationAreaSchema = Joi.object<
  Omit<JudicialRegistrationAreaType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialRegistrationAreaSchema = Joi.object<
  Omit<JudicialRegistrationAreaType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialRegistrationAreaByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialRegistrationAreaByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialRegistrationAreaSchema,
  updateJudicialRegistrationAreaSchema,
  getJudicialRegistrationAreaByCHBSchema,
  getJudicialRegistrationAreaByIDSchema,
};