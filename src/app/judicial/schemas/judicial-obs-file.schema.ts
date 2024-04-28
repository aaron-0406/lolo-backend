import Joi from "joi";
import { JudicialObsFileType } from "../types/judicial-obs-file.type";

const id = Joi.number();
const originalName = Joi.string().min(1);
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

const updateJudicialObsFileSchema = Joi.object<{ originalName: string }, true>({
  originalName: originalName.required(),
});

const getJudicialObsFileByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialObsFileByCHBAndJudicialObsSchema = Joi.object<
  { chb: number; judicialObservationId: number },
  true
>({
  chb: customerHasBankId.required(),
  judicialObservationId: customerHasBankId.required(),
});

const getJudicialObsFileByCHBAndJudicialCaseSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

export default {
  updateJudicialObsFileSchema,
  getJudicialObsFileByIDSchema,
  getJudicialObsFileByCHBAndJudicialObsSchema,
  getJudicialObsFileByCHBAndJudicialCaseSchemaQuery,
};
