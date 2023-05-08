import Joi from "joi";

const id = Joi.number();
const code = Joi.number();
const idCustomer = Joi.number();
const chb = Joi.number();

const createFileSchema = Joi.object({
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

export default { createFileSchema, getFileSchema };
