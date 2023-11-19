import Joi from "joi";

const customerId = Joi.number();
const users = Joi.string().required();
const actions = Joi.string().required();
const page = Joi.number().required().messages({
  "number.base": "El campo page es inválido",
  "any.required": "El campo page es requerido.",
});

const limit = Joi.number().required().messages({
  "number.base": "El campo limit es inválido",
  "any.required": "El campo limit es requerido.",
});

const getUserLogsByCustomerIdchema = Joi.object<{ customerId: number }, true>({
  customerId: customerId.required(),
});

const getUserLogsFilterByCustomerIdSchema = Joi.object<
  { customerId: number },
  true
>({
  customerId: customerId.required(),
});

const getUserLogsFilterByCustomerIdQuery = Joi.object({
  page,
  limit,
  actions,
  users,
}).options({ abortEarly: true });

export default {
  getUserLogsByCustomerIdchema,
  getUserLogsFilterByCustomerIdSchema,
  getUserLogsFilterByCustomerIdQuery,
};
