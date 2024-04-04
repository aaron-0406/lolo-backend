import Joi from "joi";
import { ExtOfficeType } from "../types/ext-office.type";

const id = Joi.number();
const name = Joi.string().min(2).max(200);
const address = Joi.string().min(2).max(200);
const customerId = Joi.number();
const cityId = Joi.number();
const state = Joi.boolean();

const createOfficeSchema = Joi.object<
  Omit<ExtOfficeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  address: address.required(),
  state: state.required(),
  customerId: customerId.required(),
  cityId: cityId.required(),
});

const updateOfficeStateSchema = Joi.object<{ state: boolean }, true>({
  state: state.required(),
});

const updateOfficeSchema = Joi.object<
  Omit<ExtOfficeType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  address: address.required(),
  state: state.required(),
  customerId: customerId.required(),
  cityId: cityId.required(),
});

const getOfficeByIdSchema = Joi.object<
  { id: number; customerId: number },
  true
>({
  id: id.required(),
  customerId: customerId.required(),
});

const getOfficesByCustomerIdSchema = Joi.object<
  { customerId: number },
  true
>({
  customerId: customerId.required(),
});

const getOfficesByIdSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getOfficesByCityIdSchema = Joi.object<{ cityId: number }, true>({
  cityId: cityId.required(),
});

export default {
  createOfficeSchema,
  updateOfficeStateSchema,
  updateOfficeSchema,
  getOfficeByIdSchema,
  getOfficesByCustomerIdSchema,
  getOfficesByIdSchema,
  getOfficesByCityIdSchema,
};
