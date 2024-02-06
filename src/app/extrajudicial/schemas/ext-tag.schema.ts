import Joi from "joi";
import { ExtTagType } from "../types/ext-tag.type";

const id = Joi.number();
const name = Joi.string().max(200);
const color = Joi.string().max(7);
const action = Joi.boolean();
const tagGroupId = Joi.number();
const customerHasBankId = Joi.number();

const createExtTagSchema = Joi.object<
  Omit<ExtTagType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  color: color.required(),
  action: action.required(),
  tagGroupId: tagGroupId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateExtTagSchema = Joi.object<
  Omit<ExtTagType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  color: color.required(),
  action: action.required(),
  tagGroupId: tagGroupId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateExtTagActionSchema = Joi.object<{ action: boolean }, true>({
  action: action.required(),
});

const getExtTagByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getExtTagByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createExtTagSchema,
  updateExtTagSchema,
  updateExtTagActionSchema,
  getExtTagByCHBSchema,
  getExtTagByIDSchema,
};
