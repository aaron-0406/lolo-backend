import Joi from "joi";
import { JudicialRegisterOfficeType } from "../types/judicial-register-office.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialRegisterOfficeSchema = Joi.object<
  Omit<JudicialRegisterOfficeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialRegisterOfficeSchema = Joi.object<
  Omit<JudicialRegisterOfficeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialRegisterOfficeByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialRegisterOfficeByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialRegisterOfficeSchema,
  updateJudicialRegisterOfficeSchema,
  getJudicialRegisterOfficeByCHBSchema,
  getJudicialRegisterOfficeByIDSchema,
};