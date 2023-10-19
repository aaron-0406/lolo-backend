import Joi from "joi";

const customerId = Joi.number();
const users = Joi.string().required();
const actions = Joi.string().required();

const getUserLogsByCustomerIdchema = Joi.object<{ customerId: number }, true>({
  customerId: customerId.required(),
});

const getUserLogsFilterByCustomerIdSchema = Joi.object<{ customerId: number }, true>({
  customerId: customerId.required(),
});

const getUserLogsFilterByCustomerIdQuery = Joi.object({
  actions,
  users,
}).options({ abortEarly: true });

export default {
  getUserLogsByCustomerIdchema,
  getUserLogsFilterByCustomerIdSchema,
  getUserLogsFilterByCustomerIdQuery,
};
