import Joi from "joi";

const id = Joi.number();
const code = Joi.number();
const idCustomer = Joi.number();
const chb = Joi.number();
const tagId = Joi.number();
const originalName = Joi.string();
const page = Joi.number().required().messages({
  "number.base": "El campo page es inválido",
  "any.required": "El campo page es requerido.",
});

const limit = Joi.number().required().messages({
  "number.base": "El campo limit es inválido",
  "any.required": "El campo limit es requerido.",
});
const filter = Joi.string().optional();

const createFileSchema = Joi.object({
  idCustomer,
  chb,
  code,
  id,
  tagId,
});

const updateFileSchema = Joi.object<
  { originalName: string; tagId: number },
  true
>({
  originalName: originalName.required(),
  tagId: tagId.required(),
});

const deleteFileSchema = Joi.object({
  idCustomer,
  chb,
  code,
  id,
});

const getFileSchema = Joi.object({
  idCustomer,
  chb,
  code,
  id,
});

const getFileByIdSchema = Joi.object({
  id,
});

const getFileFilterByIdAndChbSchema = Joi.object({
  id,
  chb,
});

const getUserLogsFilterByCustomerIdQuery = Joi.object({
  page,
  limit,
  filter
}).options({ abortEarly: true });

export default {
  createFileSchema,
  updateFileSchema,
  deleteFileSchema,
  getFileSchema,
  getFileByIdSchema,
  getFileFilterByIdAndChbSchema,
  getUserLogsFilterByCustomerIdQuery
};
