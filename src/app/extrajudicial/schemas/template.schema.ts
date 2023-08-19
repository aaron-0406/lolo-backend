import Joi from "joi";

const id = Joi.number().required();

const getTemplateByCustomerIdSchema = Joi.object<{ id: number }, true>({
  id,
});

export default {
  getTemplateByCustomerIdSchema,
};
