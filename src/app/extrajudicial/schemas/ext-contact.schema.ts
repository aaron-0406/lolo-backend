import Joi from "joi";
import { ExtContactType } from "../types/ext-contact.type";

const id = Joi.number();
const peruPhoneNumberRegex = /^(9\d{8}|[2-7]\d{6})$/;
const name = Joi.string().max(200);
const phone = Joi.string()
  .max(9)
  .regex(peruPhoneNumberRegex, { name: "PeruPhoneNumber", invert: false })
  .messages({
    "string.pattern.base": "El número de teléfono no es válido",
    "string.max": `El número de teléfono no debe exceder los 9 caracteres`,
  });
const email = Joi.string()
  .max(200)
  .email({ tlds: { allow: false } })
  .messages({
    "string.email": "La dirección de correo electrónico no es válida",
    "string.max":
      "La dirección de correo electrónico no debe exceder los 200 caracteres",
  });
const state = Joi.number();
const clientId = Joi.number();
const customerHasBankId = Joi.number();

const createExtContactSchema = Joi.object<
  Omit<ExtContactType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  phone: phone.optional().empty("").allow(""),
  email: email.optional().empty("").allow(""),
  state: state.required(),
  clientId: clientId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateExtContactSchema = Joi.object<
  Omit<ExtContactType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  phone: phone.optional().empty("").allow(""),
  email: email.optional().empty("").allow(""),
  state: state.required(),
  clientId: clientId.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getExtContactByClientIDSchema = Joi.object<{ clientId: number }, true>({
  clientId: clientId.required(),
});

const getExtContactByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createExtContactSchema,
  updateExtContactSchema,
  getExtContactByClientIDSchema,
  getExtContactByIDSchema,
};
