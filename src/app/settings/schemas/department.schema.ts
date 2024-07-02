import Joi from "joi";
import { DepartmentType } from "../types/department.type";

const id = Joi.number();
const name = Joi.string();
const code = Joi.string();

const createDepartmentSchema = Joi.object<
  Omit<DepartmentType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  code: code.required(),
});

const updateDepartmentSchema = Joi.object<
  Omit<DepartmentType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  code: code.required(),
});

const getDepartmentSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createDepartmentSchema,
  updateDepartmentSchema,
  getDepartmentSchema,
};
