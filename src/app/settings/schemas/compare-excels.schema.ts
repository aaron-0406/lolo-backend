import Joi from "joi";
import { CompareExcelToSendEmailType } from "../types/compare-excels.type";

export const excelFilesSchemas = Joi.object<{
  prevFile: string;
  newFile: string;
}>({
  prevFile: Joi.string().required(),
  newFile: Joi.string().required(),
});

export const compareExcelToSendEmailSchemas = Joi.object<CompareExcelToSendEmailType>({
  fileData: Joi.object({
    fileName: Joi.string().required(),
    fileSize: Joi.number().required(),
  }).required(),
  users: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().optional(),
      dni: Joi.string().optional(),
      email: Joi.string().required(),
      state: Joi.number().optional(),
    })
  ).required(),
});