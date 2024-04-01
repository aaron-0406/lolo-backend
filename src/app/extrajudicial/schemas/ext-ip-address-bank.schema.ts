import Joi from "joi";
import { ExtIpAddressBankType } from "../types/ext-ip-address-bank.type";

const id = Joi.number();
const addressName = Joi.string().min(2).max(200);
const ip = Joi.string().min(2).max(100);
const state = Joi.boolean();
const customerId = Joi.number();

const createIpAddressSchema = Joi.object<
  Omit<ExtIpAddressBankType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  addressName: addressName.required(),
  ip: ip.required(),
  state: state.required(),
  customerId: customerId.required(),
});

const updateIpAddressStateSchema = Joi.object<{ state: boolean }, true>({
  state: state.required(),
});

const updateIpAddressSchema = Joi.object<
  Omit<ExtIpAddressBankType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  addressName: addressName.required(),
  ip: ip.required(),
  state: state.required(),
  customerId: customerId.required(),
});

const getIpAddressByIdSchema = Joi.object<
  { id: number; customerId: number },
  true
>({
  id: id.required(),
  customerId: customerId.required(),
});

const getIpAddressByIpSchema = Joi.object<
  { ip: string; customerId: number },
  true
>({
  ip: ip.required(),
  customerId: customerId.required(),
});

const getIpAddressesByCustomerIdSchema = Joi.object<
  { customerId: number },
  true
>({
  customerId: customerId.required(),
});

const getIpAddressesByIdSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createIpAddressSchema,
  updateIpAddressStateSchema,
  updateIpAddressSchema,
  getIpAddressByIdSchema,
  getIpAddressByIpSchema,
  getIpAddressesByCustomerIdSchema,
  getIpAddressesByIdSchema,
};
