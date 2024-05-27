import Joi from "joi";
import { JudicialSedeType } from "../types/judicial-sede.type";

const id = Joi.number();
const sede = Joi.string().max(200);
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

const createJudicialSedeSchema = Joi.object<
  Omit<JudicialSedeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  sede: sede.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialSedeSchema = Joi.object<
  Omit<JudicialSedeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  sede: sede.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialSedeByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialSedeByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getJudicialSedeByCHBSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

export default {
  createJudicialSedeSchema,
  updateJudicialSedeSchema,
  getJudicialSedeByIDSchema,
  getJudicialSedeByCHBSchema,
  getJudicialSedeByCHBSchemaQuery,
};
