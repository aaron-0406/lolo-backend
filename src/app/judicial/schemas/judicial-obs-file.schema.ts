import Joi from "joi";
import { JudicialObsFileType } from "../types/judicial-obs-file.type";

const id = Joi.number();
const judicialObservationId = Joi.number();
const awsName = Joi.string();
const originalName = Joi.string();
const customerHasBankId = Joi.number();

const idCustomer = Joi.number();
const chb = Joi.number();
const judicialFileCaseId = Joi.number();
const code = Joi.string();

const createJudicialObsFileSchema = Joi.object<
  Omit<JudicialObsFileType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  awsName: awsName.required(),
  originalName: originalName.required(),
  customerHasBankId: customerHasBankId.required(),
  judicialObservationId: judicialObservationId.required(),
});

const updateJudicialObsFileSchema = Joi.object<
  { awsName: string; originalName: string },
  true
>({
  awsName: awsName.required(),
  originalName: originalName.required(),
});

const getFileSchema = Joi.object({
  idCustomer,
  chb,
  code,
  id,
  judicialFileCaseId,
});

const getJudicialObsFileByIDSchema = Joi.object({
  id: id.required(),
  chb,
  code,
  idCustomer,
  judicialFileCaseId,
});

const getJudicialObsFileByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  getFileSchema,
  createJudicialObsFileSchema,
  updateJudicialObsFileSchema,
  getJudicialObsFileByCHBSchema,
  getJudicialObsFileByIDSchema,
};
