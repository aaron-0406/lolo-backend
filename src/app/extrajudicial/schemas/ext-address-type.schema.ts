import Joi from "joi";
import { ExtAddressType } from "../types/ext-address-type.type";

const id = Joi.number();
const type = Joi.string().min(1).max(200);
const customerHasBankId = Joi.number();

const createAddressTypeSchema = Joi.object<
  Omit<ExtAddressType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  type: type.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateAddressTypeSchema = Joi.object<
  Omit<ExtAddressType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  type: type.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getAddressTypeByChbSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getAddressTypeByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getAddressTypeByIDAndCHBSchema = Joi.object<
  { id: number; chb: number },
  true
>({
  id: id.required(),
  chb: customerHasBankId.required(),
});

export default {
  createAddressTypeSchema,
  updateAddressTypeSchema,
  getAddressTypeByChbSchema,
  getAddressTypeByIDSchema,
  getAddressTypeByIDAndCHBSchema,
};
