import Joi from "joi";
import { ProductType } from "../types/product.tyoe";

const code = Joi.string().required();
const state = Joi.string().required();
const id = Joi.number().required();
const customerId = Joi.number().required();
const name = Joi.string().required();
const negotiationId = Joi.number().required();
const clientId = Joi.number().required();

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
  Omit<ProductType, "id" | "cityId" | "funcionarioId" | "customerHasBankId">,
  true
>({
  code,
  state,
  customerId,
  name,
  negotiationId,
  clientId,
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
