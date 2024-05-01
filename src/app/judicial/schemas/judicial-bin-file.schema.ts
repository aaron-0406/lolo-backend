import Joi from "joi";
import { JudicialBinFileType } from "../types/judicial-bin-file.type";

const id = Joi.number();
const judicialBinnacleId = Joi.number();
const nameOriginAws = Joi.string();
const originalName = Joi.string();
const customerHasBankId = Joi.number();

const idCustomer = Joi.number();
const chb = Joi.number();
const judicialFileCaseId = Joi.number();
const code = Joi.string();

const createJudicialBinFileSchema = Joi.object<
  Omit<JudicialBinFileType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  nameOriginAws: nameOriginAws.required(),
  originalName: originalName.required(),
  customerHasBankId: customerHasBankId.required(),
  judicialBinnacleId: judicialBinnacleId.required(),
});

const updateJudicialBinFileSchema = Joi.object<
  Omit<
    JudicialBinFileType,
    | "id"
    | "customerHasBankId"
    | "judicialBinnacleId"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  >,
  true
>({
  nameOriginAws: nameOriginAws.required(),
  originalName: originalName.required(),
});

const getFileSchema = Joi.object({
  idCustomer,
  chb,
  code,
  id,
  judicialFileCaseId,
});

const getJudicialBinFileByIDSchema = Joi.object({
  id: id.required(),
  chb,
  code,
  idCustomer,
  judicialFileCaseId,
});

const getJudicialBinFileByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  getFileSchema,
  createJudicialBinFileSchema,
  updateJudicialBinFileSchema,
  getJudicialBinFileByCHBSchema,
  getJudicialBinFileByIDSchema,
};
