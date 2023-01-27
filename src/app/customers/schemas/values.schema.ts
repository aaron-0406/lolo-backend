import Joi from "joi";

const id = Joi.number().required();

const getValuesByTemplateHasValuesIdSchema = Joi.object<{ id: number }, true>({
  id,
});

export default {
    getValuesByTemplateHasValuesIdSchema,
};
