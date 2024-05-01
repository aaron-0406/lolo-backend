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
const judicialCaseFileId = Joi.number();

const productIds = Joi.string();

//INFO: CLIENTS SECTION
export const getProductsByClientCodeSchema = Joi.object<
  { clientId: number },
  true
>({
  clientId: clientId.required(),
});

export const getProductByIdSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

//INFO: JUDICIAL - CASE FILE SECTION
export const getProductsByJudicialCaseFileIdSchema = Joi.object<
  { judicialCaseFileId: number },
  true
>({
  judicialCaseFileId: judicialCaseFileId.required(),
});

export const assignJudicialCaseFileToProductsSchema = Joi.object<
  { productIds: string; judicialCaseFileId: number },
  true
>({
  productIds: productIds.required(),
  judicialCaseFileId: judicialCaseFileId.required(),
});

export const removeJudicialCaseFileFromProductSchema = Joi.object<
  { productRemovedId: number; judicialCaseFileId: number },
  true
>({
  productRemovedId: id.required(),
  judicialCaseFileId: judicialCaseFileId.required(),
});

//INFO: DASHBOARD SECTION
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
  judicialCaseFileId: judicialCaseFileId.optional(),
});

export const updateProductSchema = Joi.object<
  Omit<
    ProductType,
    "customerId" | "id" | "cityId" | "funcionarioId" | "clientId"
  >,
  true
>({
  code: code.required(),
  state: state.required(),
  negotiationId: negotiationId.required(),
  extProductNameId: extProductNameId.optional(),
  customerHasBankId: customerHasBankId.required(),
  judicialCaseFileId: judicialCaseFileId.optional(),
});
