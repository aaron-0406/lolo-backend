import Joi from "joi";
import { ExtTagType } from "../types/ext-tag.type";

const id = Joi.number();
const name = Joi.string().max(200);
const color = Joi.string().max(7);
const tagGroupId = Joi.number();
const customerHasBankId = Joi.number();

const createExtTagSchema = Joi.object<
  Omit<ExtTagType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  color: color.required(),
  tagGroupId: tagGroupId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateExtTagSchema = Joi.object<
  Omit<ExtTagType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  color: color.required(),
  tagGroupId: tagGroupId.required(),
  customerHasBankId: customerHasBankId.required(),
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
  getExtTagByCHBSchema,
  getExtTagByIDSchema,
};
