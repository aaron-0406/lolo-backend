import Joi from "joi";

const id = Joi.number();
const code = Joi.number();
const idBank = Joi.number();

const createFileSchema = Joi.object({
  id,
  code,
  idBank,
});

const getFileSchema = Joi.object({
  id,
  idBank,
  code,
});

export default { createFileSchema, getFileSchema };
