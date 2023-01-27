import Joi from "joi";
import { TemplateHasValuesType } from "../types/template-has-values.type";
import { ValuesType } from "../types/values.type";

const id = Joi.number().required();
const templateId = Joi.number().required();
const name = Joi.string().required();
const values = Joi.array().required();

const createTemplateHasValuesSchema = Joi.object<
  { values: Array<ValuesType> } & Omit<
    TemplateHasValuesType,
    "id" | "createdAt"
  >,
  true
>({
  name,
  templateId,
  values,
});
const updateTemplateHasValuesSchema = Joi.object<
  { values: Array<ValuesType> } & Omit<
    TemplateHasValuesType,
    "id" | "createdAt" | "templateId"
  >,
  true
>({
  name,
  values,
});

const getTemplateHasValuesByIdSchema = Joi.object<{ id: number }, true>({
  id,
});

export default {
  createTemplateHasValuesSchema,
  updateTemplateHasValuesSchema,
  getTemplateHasValuesByIdSchema,
};
