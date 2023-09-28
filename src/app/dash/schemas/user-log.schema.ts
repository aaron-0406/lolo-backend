import Joi from "joi";

const customerId = Joi.number();

const getUserLogsByCustomerIdchema = Joi.object<{ customerId: number }, true>({
  customerId: customerId.required(),
});

export default {
  getUserLogsByCustomerIdchema,
};
