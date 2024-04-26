import Joi from "joi";
import { JudicialObservationType } from "../types/judicial-observation.type";

const id = Joi.number();
const date = Joi.date();
const comment = Joi.string().min(1);
const judicialCaseFileId = Joi.number();
const judicialObsTypeId = Joi.number();
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

const createJudicialObservationSchema = Joi.object<
  Omit<JudicialObservationType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  date: date.required(),
  comment: comment.required(),
  judicialCaseFileId: judicialCaseFileId.required(),
  judicialObsTypeId: judicialObsTypeId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialObservationSchema = Joi.object<
  Omit<
    JudicialObservationType,
    "id" | "judicialCaseFileId" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  date: date.required(),
  comment: comment.required(),
  judicialObsTypeId: judicialObsTypeId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialObservationByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialObservationByCHBAndJudicialCaseSchema = Joi.object<
  { chb: number; judicialCaseId: number },
  true
>({
  chb: customerHasBankId.required(),
  judicialCaseId: customerHasBankId.required(),
});

const getJudicialObservationByCHBAndJudicialCaseSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

export default {
  createJudicialObservationSchema,
  updateJudicialObservationSchema,
  getJudicialObservationByIDSchema,
  getJudicialObservationByCHBAndJudicialCaseSchema,
  getJudicialObservationByCHBAndJudicialCaseSchemaQuery,
};
