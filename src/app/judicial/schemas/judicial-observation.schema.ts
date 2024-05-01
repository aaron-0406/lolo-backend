import Joi from "joi";
import { JudicialObservationType } from "../types/judicial-observation.type";
import { JudicialObsFileType } from "../types/judicial-obs-file.type";

//judicial observation
const id = Joi.number();
const date = Joi.date();
const comment = Joi.string().min(1);
const judicialCaseFileId = Joi.number();
const judicialObsTypeId = Joi.number();
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

//judicial-obs-file
const originalName = Joi.string().min(1);
const judicialObservationId = Joi.number();

const createJudicialObservationSchema = Joi.object({
  JudicialObservation: Joi.object<
    Omit<
      JudicialObservationType,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    >,
    true
  >({
    date: date.required(),
    comment: comment.required(),
    judicialCaseFileId: judicialCaseFileId.required(),
    judicialObsTypeId: judicialObsTypeId.required(),
    customerHasBankId: customerHasBankId.required(),
  }).required(),
  JudicialObsFile: Joi.array()
    .items(
      Joi.object<
        Omit<
          JudicialObsFileType,
          "id" | "awsName" | "createdAt" | "updatedAt" | "deletedAt"
        >,
        true
      >({
        originalName: originalName.required(),
        judicialObservationId: judicialObservationId.required(),
        customerHasBankId: customerHasBankId.required(),
      }).options({ stripUnknown: true })
    )
    .required(),
}).options({ stripUnknown: true });

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
  date: date.required(),
  comment: comment.required(),
  judicialObsTypeId: judicialObsTypeId.required(),
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
