import Joi from "joi";

const id = Joi.number().required();

const getECampoByIdSchema = Joi.object<{ id: number }, true>({
  id,
});

export default {
  getECampoByIdSchema,
};
