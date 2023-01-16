import Joi from "joi";
import { ClientType } from "../types/client.type";

const code = Joi.string().min(1).max(50);
const negotiationId = Joi.number().required();
const dniOrRuc = Joi.string().min(1).max(20);
const name = Joi.string().min(1).max(200);
const salePerimeter = Joi.string();
const phone = Joi.string().min(1).max(300);
const email = Joi.string().min(1).max(300);
const createdAt = Joi.date();
const cityId = Joi.number();
const funcionarioId = Joi.number();
const customerUserId = Joi.number();
const customerHasBankId = Joi.number();
const idBank = Joi.number();

const createClientSchema = Joi.object<Omit<ClientType, "id">, true>({
  code: code.required(),
  negotiationId,
  dniOrRuc: dniOrRuc.required(),
  name: name.required(),
  salePerimeter: salePerimeter.optional(),
  phone: phone.optional(),
  email: email.optional(),
  createdAt: createdAt.optional(),
  cityId: cityId.required(),
  funcionarioId: funcionarioId.required(),
  customerUserId: customerUserId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateClientSchema = Joi.object<
  Omit<ClientType, "id" | "code" | "customerHasBankId">,
  true
>({
  negotiationId,
  dniOrRuc: dniOrRuc,
  name: name,
  salePerimeter: salePerimeter,
  phone: phone,
  email: email,
  createdAt: createdAt,
  customerUserId: customerUserId,
  cityId: cityId,
  funcionarioId: funcionarioId,
});

const getClientByCodeSchema = Joi.object<{ code: string; chb: number }, true>({
  code: code.required(),
  chb: customerHasBankId.required(),
});

const getClientByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getClientByBank = Joi.object<{ idBank: number }, true>({
  idBank,
});

const deleteClientByCodeSchema = Joi.object<
  { code: string; chb: number; idBank: number },
  true
>({
  code: code.required(),
  chb: customerHasBankId.required(),
  idBank,
});

export default {
  createClientSchema,
  getClientByBank,
  updateClientSchema,
  getClientByCHBSchema,
  getClientByCodeSchema,
  deleteClientByCodeSchema,
};
