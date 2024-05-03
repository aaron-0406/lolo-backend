import Joi from "joi";
import { JudicialObsTypeType } from "../types/judicial-obs-type.type";

const id = Joi.number();
const type = Joi.string().max(200);
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

const createJudicialObsTypeSchema = Joi.object<
  Omit<JudicialObsTypeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  type: type.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialObsTypeSchema = Joi.object<
  Omit<JudicialObsTypeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  type: type.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialObsTypeByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialObsTypeByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getJudicialObsTypeByCHBSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

export default {
  createJudicialObsTypeSchema,
  updateJudicialObsTypeSchema,
  getJudicialObsTypeByIDSchema,
  getJudicialObsTypeByCHBSchema,
  getJudicialObsTypeByCHBSchemaQuery,
};
