"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(2).max(100);
const lastName = joi_1.default.string().min(2).max(100);
const phone = joi_1.default.string().min(2).max(50);
const dni = joi_1.default.string().max(8);
const email = joi_1.default.string().min(2).max(70);
const password = joi_1.default.string()
    .min(12)
    .max(70)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9])/)
    .messages({
    "string.pattern.base": "El campo debe contener al menos una letra minúscula y mayúscula, un número, junto a un caracter.",
});
const state = joi_1.default.boolean();
const createAt = joi_1.default.date();
const customerId = joi_1.default.number();
const roleId = joi_1.default.number().integer().min(1);
const loginAttempts = joi_1.default.number().integer().min(0);
const createCustomerUserSchema = joi_1.default.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    dni: dni.optional(),
    email: email.required(),
    password: password.required(),
    state: state.required(),
    createdAt: createAt.optional(),
    customerId: customerId.required(),
    roleId: roleId.required(),
    loginAttempts: loginAttempts.optional(),
});
const updateCustomerUserStateSchema = joi_1.default.object({
    state: state.required(),
});
const updateCustomerUserSchema = joi_1.default.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    dni: dni.optional(),
    state: state.required(),
    password: password.optional(),
    roleId: roleId.required(),
});
const getCustomerUserSchema = joi_1.default.object({
    id: id.required(),
});
const getCustomerUserByIdSchema = joi_1.default.object({
    customerId: customerId.required(),
});
exports.default = {
    createCustomerUserSchema,
    updateCustomerUserSchema,
    getCustomerUserSchema,
    getCustomerUserByIdSchema,
    updateCustomerUserStateSchema,
};
