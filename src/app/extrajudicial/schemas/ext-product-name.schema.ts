import Joi from "joi";
import { ExtProductNameType } from "../types/ext-product-name";

const id = Joi.number();
const productName = Joi.string().max(200);
const customerHasBankId = Joi.number();
const visible = Joi.boolean();

const createExtProductNameSchema = Joi.object<
  Omit<ExtProductNameType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  productName: productName.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateExtProductNameSchema = Joi.object<
  Omit<ExtProductNameType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  productName: productName.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getExtProductNameByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getExtProductNameByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getExtProductNameByCHBSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

export default {
  createExtProductNameSchema,
  updateExtProductNameSchema,
  getExtProductNameByCHBSchema,
  getExtProductNameByIDSchema,
  getExtProductNameByCHBSchemaQuery,
};
