import Joi from "joi";
import { ExtTagGroupType } from "../types/ext-tag-group.type";

const id = Joi.number();
const name = Joi.string().max(200);

const createExtTagGroupSchema = Joi.object<
  Omit<ExtTagGroupType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
});

const updateExtTagGroupSchema = Joi.object<
  Omit<ExtTagGroupType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
});

const getExtTagGroupByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createExtTagGroupSchema,
  updateExtTagGroupSchema,
  getExtTagGroupByIDSchema,
};
