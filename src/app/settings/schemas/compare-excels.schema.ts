import Joi from "joi";

export const excelFilesSchemas = Joi.object<{
  prevFile: string;
  newFile: string;
}>({
  prevFile: Joi.string().required(),
  newFile: Joi.string().required(),
});