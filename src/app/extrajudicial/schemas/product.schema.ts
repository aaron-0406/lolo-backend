import Joi from "joi";
import { ProductType } from "../types/product.tyoe";

const id = Joi.number();
const code = Joi.string();
const state = Joi.string();
const customerId = Joi.number();
const negotiationId = Joi.number();
const clientId = Joi.number();
const customerHasBankId = Joi.number();
const extProductNameId = Joi.number();

export const getProductsByClientCodeSchema = Joi.object<
  { clientId: number },
  true
>({
  clientId: clientId.required(),
});

export const getProductByIdSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export const getProductByCodeSchema = Joi.object<{ code: string }, true>({
  code: code.required(),
});

export const getProductsByCustomerIdSchema = Joi.object<
  { customerId: number },
  true
>({
  customerId: customerId.required(),
});

export const createProductSchema = Joi.object<
  Omit<ProductType, "id" | "cityId" | "funcionarioId">,
  true
>({
  code: code.required(),
  state: state.required(),
  customerId: customerId.required(),
  negotiationId: negotiationId.required(),
  clientId: clientId.required(),
  customerHasBankId: customerHasBankId.required(),
  extProductNameId: extProductNameId.optional(),
});

export const updateProductSchema = Joi.object<
  Omit<
    ProductType,
    | "customerId"
    | "id"
    | "cityId"
    | "funcionarioId"
    | "customerHasBankId"
    | "clientId"
  >,
  true
>({
  code: code.required(),
  state: state.required(),
  negotiationId: negotiationId.required(),
  extProductNameId: extProductNameId.optional(),
});
