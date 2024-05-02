import Joi from "joi";
import { JudicialObservationType } from "../types/judicial-observation.type";

const id = Joi.number();
const comment = Joi.string();
const customerHasBankId = Joi.number();
const judicialObsTypeId = Joi.number();
const judicialFileCaseId = Joi.number();
const date = Joi.date();
const visible = Joi.boolean();

const createJudicialObservationSchema = Joi.object<
  Omit<JudicialObservationType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  judicialObsTypeId: judicialObsTypeId.required(),
  customerHasBankId: customerHasBankId.required(),
  comment: comment.required(),
  date: date.required(),
  judicialCaseFileId: judicialFileCaseId.required(),
});

const updateJudicialObservationSchema = Joi.object<
  Omit<
    JudicialObservationType,
    | "id"
    | "customerHasBankId"
    | "judicialCaseFileId"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  >,
  true
>({
  comment: comment.required(),
  judicialObsTypeId: judicialObsTypeId.required(),
  date: date.required(),
});

const getJudicialObservationByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const createJudicialObservationParamSchema = Joi.object<
  { code: string; idCustomer: number },
  true
>({
  code: Joi.string().required(),
  idCustomer: Joi.number().required(),
});
const updateJudicialObservationParamSchema = Joi.object<
  { id: number; code: string; idCustomer: number },
  true
>({
  id: id.required(),
  code: Joi.string().required(),
  idCustomer: Joi.number().required(),
});

const getJudicialObservationByCHBSchema = Joi.object<
  { fileCase: number },
  true
>({
  fileCase: Joi.number().required(),
});

const getJudicialObservationByCHBSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });


export default {
  createJudicialObservationSchema,
  updateJudicialObservationSchema,
  getJudicialObservationByCHBSchema,
  getJudicialObservationByIDSchema,
  createJudicialObservationParamSchema,
  updateJudicialObservationParamSchema,
  getJudicialObservationByCHBSchemaQuery,
};
