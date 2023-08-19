import Joi from "joi";

const id = Joi.number().required();
const usersId = Joi.array<number[]>().required();

const createDocumentSchema = Joi.object<
  { templateHasValuesId: number; usersId: number[] },
  true
>({
  templateHasValuesId: id,
  usersId,
});

export default {
  createDocumentSchema,
};
