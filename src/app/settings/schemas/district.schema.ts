import Joi from "joi";
import { DistrictType } from "../types/district.type";

const id = Joi.number();
const name = Joi.string();
const code = Joi.string();
const provinceId = Joi.number();

const createDistrictSchema = Joi.object<
  Omit<DistrictType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  code: code.required(),
  provinceId: provinceId.required(),
});

const updateDistrictSchema = Joi.object<
  Omit<DistrictType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  code: code.required(),
  provinceId: provinceId.required(),
});

const getDistrictSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getDistrictByProvinceSchema = Joi.object<{ provinceId: number }, true>({
  provinceId: provinceId.required(),
});

export default {
  createDistrictSchema,
  updateDistrictSchema,
  getDistrictSchema,
  getDistrictByProvinceSchema,
};
