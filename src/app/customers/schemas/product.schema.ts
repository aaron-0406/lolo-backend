import Joi from "joi";
import { ProductType } from "../types/product.tyoe";

const code = Joi.string().required();
const state = Joi.string().required();
const id = Joi.number().required();
const customerId = Joi.number().required();
const name = Joi.string().required();

export const getProductsByClientCodeSchema = Joi.object<{ code: string }, true>(
  {
    code,
  }
);

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

export const createProductSchema = Joi.object<Omit<ProductType, "id">, true>({
  code,
  state,
  clientCode: code,
  customerId,
  name,
});

export const updateProductSchema = Joi.object<
  Omit<ProductType, "customerId" | "clientCode" | "code" | "id">,
  true
>({
  state,
  name,
});

export const changeProductSchema = Joi.object<
  Omit<ProductType, "customerId" | "clientCode" | "code" | "id">,
  true
>({
  state: state.optional(),
  name,
});
