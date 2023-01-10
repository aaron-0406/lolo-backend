import Joi from "joi";

const id = Joi.number();

const createFileSchema = Joi.object({
  id,
});

const getFileSchema = Joi.object({
  id,
});

export default { createFileSchema, getFileSchema };
