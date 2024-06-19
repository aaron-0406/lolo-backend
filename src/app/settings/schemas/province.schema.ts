import Joi from "joi";
import { ProvinceType } from "../types/province.type";

const id = Joi.number();
const name = Joi.string();
const code = Joi.string();
const departmentId = Joi.number();

const createProvinceSchema = Joi.object<
  Omit<ProvinceType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  code: code.required(),
  departmentId: departmentId.required(),
});

const updateProvinceSchema = Joi.object<
  Omit<ProvinceType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  code: code.required(),
  departmentId: departmentId.required(),
});

const getProvinceSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createProvinceSchema,
  updateProvinceSchema,
  getProvinceSchema,
};