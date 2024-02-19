import Joi from "joi";

const id = Joi.number();
const code = Joi.number();
const idCustomer = Joi.number();
const chb = Joi.number();
const tagId = Joi.number();
const originalName = Joi.string();

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

export default {
  createFileSchema,
  updateFileSchema,
  deleteFileSchema,
  getFileSchema,
  getFileByIdSchema,
};
