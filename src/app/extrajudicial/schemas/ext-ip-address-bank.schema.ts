import Joi from "joi";
import { ExtIpAddressBankType } from "../types/ext-ip-address-bank.type";

const id = Joi.number();
const addressName = Joi.string().min(2).max(100);
const ip = Joi.string().min(2).max(100);
const state = Joi.boolean();

const createIpAddressSchema = Joi.object<
  Omit<ExtIpAddressBankType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  addressName: addressName.required(),
  ip: ip.required(),
  state: state.required(),
});

const updateIpAddressStateSchema = Joi.object<{ state: boolean }, true>({
  state: state.required(),
});

const updateIpAddressSchema = Joi.object<
  Omit<ExtIpAddressBankType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  addressName: addressName.required(),
  ip: ip.optional().empty("").allow(""),
  state: state.required(),
});

const getIpAddressSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getIpAddressByIpSchema = Joi.object<{ ip: string }, true>({
  ip: ip.required(),
});

export default {
  createIpAddressSchema,
  updateIpAddressStateSchema,
  updateIpAddressSchema,
  getIpAddressSchema,
  getIpAddressByIpSchema,
};
