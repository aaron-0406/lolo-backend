import Joi from "joi";
import { RoleType } from "../types/role.type";

const id = Joi.number();
const customerId = Joi.number();
const name = Joi.string().min(1).max(100);
const permissions = Joi.array().items(Joi.number().positive());

const createRoleSchema = Joi.object<
  Omit<RoleType & { permissions: Array<number> }, "id">,
  true
>({
  name: name.required(),
  customerId: customerId.required(),
  permissions: permissions.required(),
});

const getRoleSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});
const getAllRoleSchema = Joi.object<{ customerId: number }, true>({
  customerId: id.required(),
});

const updateRoleSchema = Joi.object<
  Omit<RoleType & { permissions: Array<number> }, "id" | "customerId">,
  true
>({
  name: name,
  permissions,
});

export default {
  getAllRoleSchema,
  createRoleSchema,
  updateRoleSchema,
  getRoleSchema,
};
