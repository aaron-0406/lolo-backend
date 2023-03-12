import Joi from "joi";

const file = Joi.string().required().messages({
  "any.required": "Se debe mandar un archivo",
});

const customerId = Joi.number().required().messages({
  "any.required": "Se debe mandar un archivo",
});

export const excelFileSchema = Joi.object<
  { file: string; customerId: number },
  true
>({
  file,
  customerId,
});
