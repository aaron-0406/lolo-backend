import Joi from "joi";
import { ProductType } from "../types/product.tyoe";

const code = Joi.string().required();
const state = Joi.string().required();
const id = Joi.number().required();
const customerId = Joi.number().required();
const name = Joi.string().required();
const negotiationId = Joi.number().required();
const clientId = Joi.number().required();
const customerHasBankId = Joi.number();

export const getProductsByClientCodeSchema = Joi.object<
  { clientId: number },
  true
>({
  clientId,
});

export const getProductByIdSchema = Joi.object<{ id: number }, true>({
  id,
});

export const getProductByCodeSchema = Joi.object<{ code: string }, true>({
  code,
});

export const getProductsByCustomerIdSchema = Joi.object<
  { customerId: number },
  true
>({
  customerId,
});

export const createProductSchema = Joi.object<
  Omit<ProductType, "id" | "cityId" | "funcionarioId">,
  true
>({
  code,
  state,
  customerId,
  name,
  negotiationId,
  clientId,
  customerHasBankId: customerHasBankId.required(),
});

export const updateProductSchema = Joi.object<
  Omit<
    ProductType,
    | "customerId"
    | "clientCode"
    | "code"
    | "id"
    | "cityId"
    | "funcionarioId"
    | "customerHasBankId"
    | "clientId"
  >,
  true
>({
  state,
  negotiationId,
  name,
});
