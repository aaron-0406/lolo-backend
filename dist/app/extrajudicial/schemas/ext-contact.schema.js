"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const peruPhoneNumberRegex = /^(9\d{8}|[1-7]\d{6})$/;
const name = joi_1.default.string().max(200);
const phone = joi_1.default.string()
    .max(9)
    .regex(peruPhoneNumberRegex, { name: "PeruPhoneNumber", invert: false })
    .messages({
    "string.pattern.base": "El número de teléfono no es válido",
    "string.max": `El número de teléfono no debe exceder los 9 caracteres`,
});
const email = joi_1.default.string()
    .max(200)
    .email({ tlds: { allow: false } })
    .messages({
    "string.email": "La dirección de correo electrónico no es válida",
    "string.max": "La dirección de correo electrónico no debe exceder los 200 caracteres",
});
const state = joi_1.default.boolean();
const clientId = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const extContactTypeId = joi_1.default.number();
const dni = joi_1.default.string();
const createExtContactSchema = joi_1.default.object({
    name: name.required(),
    phone: phone.optional().empty("").allow(""),
    email: email.optional().empty("").allow(""),
    state: state.required(),
    clientId: clientId.required(),
    customerHasBankId: customerHasBankId.required(),
    extContactTypeId: extContactTypeId.required(),
    dni: dni.required(),
});
const updateExtContactSchema = joi_1.default.object({
    name: name.required(),
    phone: phone.optional().empty("").allow(""),
    email: email.optional().empty("").allow(""),
    state: state.required(),
    clientId: clientId.required(),
    customerHasBankId: customerHasBankId.required(),
    extContactTypeId: extContactTypeId.required(),
    dni: dni.required(),
});
const updateExtContactStateSchema = joi_1.default.object({
    state: state.required(),
});
const getExtContactByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getExtContactByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createExtContactSchema,
    updateExtContactSchema,
    getExtContactByClientIDSchema,
    getExtContactByIDSchema,
    updateExtContactStateSchema,
};
