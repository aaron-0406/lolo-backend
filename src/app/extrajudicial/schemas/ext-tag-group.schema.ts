import Joi from "joi";
import { ExtTagGroupType } from "../types/ext-tag-group.type";

const id = Joi.number();
const name = Joi.string().max(200);
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

const createExtTagGroupSchema = Joi.object<
  Omit<ExtTagGroupType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateExtTagGroupSchema = Joi.object<
  Omit<ExtTagGroupType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getExtTagGroupByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export const getExtTagGroupByCHBSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

const getExtTagGroupByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createExtTagGroupSchema,
  updateExtTagGroupSchema,
  getExtTagGroupByCHBSchema,
  getExtTagGroupByIDSchema,
  getExtTagGroupByCHBSchemaQuery,
};
