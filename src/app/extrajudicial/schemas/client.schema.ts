import Joi from "joi";
import { ClientType } from "../types/client.type";

const id = Joi.number();
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
const idCustomer = Joi.number();

const page = Joi.number().required().messages({
  "number.base": "El campo page es inválido",
  "any.required": "El campo page es requerido.",
});

const limit = Joi.number().required().messages({
  "number.base": "El campo limit es inválido",
  "any.required": "El campo limit es requerido.",
});

const filter = Joi.string().optional().min(3).messages({
  "string.base": "El campo filter es inválido",
  "any.required": "El campo filter es requerido.",
  "string.min": "El campo debe ser de mínimo 3 caracteres",
  "string.empty": "El campo filter no puede estar vácio",
});

const negotiations = Joi.string().required();
const funcionarios = Joi.string().required();
const users = Joi.string().required();
const cities = Joi.string().required();

const saveClientSchema = Joi.object<ClientType, true>({
  id: id.optional(),
  code: code.required(),
  negotiationId,
  dniOrRuc: dniOrRuc.optional().empty("").allow(""),
  name: name.required(),
  salePerimeter: salePerimeter.optional().empty("").allow(""),
  phone: phone.optional().empty("").allow(""),
  email: email.optional().empty("").allow(""),
  createdAt: createdAt.optional(),
  cityId: cityId.required(),
  funcionarioId: funcionarioId.required(),
  customerUserId: customerUserId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getClientByCodeSchema = Joi.object<{ code: string; chb: number }, true>({
  code: code.required(),
  chb: customerHasBankId.required(),
});

const getClientByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

const getClientByCHBSchemaQuery = Joi.object({
  page,
  filter,
  limit,
  negotiations,
  funcionarios,
  users,
  cities,
}).options({ abortEarly: true });

const getClientByNameSchemaQuery = Joi.object({
  filter,
}).options({ abortEarly: true });

const getClientByCustomer = Joi.object<{ idCustomer: number }, true>({
  idCustomer,
});

const deleteClientByCodeSchema = Joi.object<
  { code: string; chb: number; idCustomer: number },
  true
>({
  code: code.required(),
  chb: customerHasBankId.required(),
  idCustomer,
});

const getDateSchema = Joi.object<{ date: Date; cityId: number }, true>({
  date: Joi.date().required(),
  cityId: cityId.required(),
});

export default {
  saveClientSchema,
  getClientByCustomer,
  getClientByCHBSchema,
  getClientByCodeSchema,
  deleteClientByCodeSchema,
  getClientByCHBSchemaQuery,
  getClientByNameSchemaQuery,
  getDateSchema,
};
