"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string().email().required();
const password = joi_1.default.string().required();
const newPassword = joi_1.default.string()
    .min(12)
    .max(70)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9])/)
    .messages({
    "string.pattern.base": "El campo debe contener al menos una letra minúscula y mayúscula, un número, junto a un caracter.",
})
    .required();
const name = joi_1.default.string().required();
const lastname = joi_1.default.string().required();
const dni = joi_1.default.string().required().max(8);
const phone = joi_1.default.string().required();
const customerId = joi_1.default.number().required().min(1);
const code2fa = joi_1.default.string();
const loginSchema = joi_1.default.object({
    email,
    password,
    customerId,
    code2fa: code2fa.optional().empty("").allow(""),
}).options({ abortEarly: true });
const changePasswordSchema = joi_1.default.object({
    newPassword,
    repeatPassword: newPassword,
}).options({ abortEarly: true });
const changeCredentialsSchema = joi_1.default.object({
    name,
    lastname,
    dni,
    phone,
}).options({ abortEarly: true });
exports.default = { loginSchema, changePasswordSchema, changeCredentialsSchema };
