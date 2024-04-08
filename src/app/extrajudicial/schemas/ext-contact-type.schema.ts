import Joi from "joi";
import { ExtContactTypeType } from "../types/ext-contact-type.type";

const id = Joi.number();
const contactType = Joi.string().max(200);
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

const createExtContactTypeSchema = Joi.object<
  Omit<ExtContactTypeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  contactType: contactType.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateExtContactTypeSchema = Joi.object<
  Omit<ExtContactTypeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  contactType: contactType.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getExtContactTypeByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getExtContactTypeByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getContactTypeByCHBSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

export default {
  createExtContactTypeSchema,
  updateExtContactTypeSchema,
  getExtContactTypeByCHBSchema,
  getExtContactTypeByIDSchema,
  getContactTypeByCHBSchemaQuery,
};
