import Joi from "joi";
import { JudicialBinFileType } from "../types/judicial-bin-file.type";

const id = Joi.number();
const judicialBinnacleId = Joi.number();
const nameOriginAws = Joi.string();
const originalName = Joi.string();
const customerHasBankId = Joi.number();

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

const getJudicialBinFileByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialBinFileByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialBinFileSchema,
  updateJudicialBinFileSchema,
  getJudicialBinFileByCHBSchema,
  getJudicialBinFileByIDSchema,
};
