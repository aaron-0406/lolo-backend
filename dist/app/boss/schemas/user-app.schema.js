"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const code = joi_1.default.string().min(9).max(9);
const dni = joi_1.default.string().max(8);
const name = joi_1.default.string().min(2).max(100);
const lastName = joi_1.default.string().min(2).max(100);
const address = joi_1.default.string().min(2).max(100);
const phone = joi_1.default.string().min(2).max(50);
const email = joi_1.default.string().min(2).max(70);
const password = joi_1.default.string().min(2).max(70);
const state = joi_1.default.boolean();
const createAt = joi_1.default.date();
const createUserSchema = joi_1.default.object({
    code: code.required(),
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    dni: dni.required(),
    address: address.optional(),
    email: email.required(),
    password: password.required(),
    state: state.required(),
    createdAt: createAt.optional(),
});
const updateUserSchema = joi_1.default.object({
    code: code.required(),
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    dni: dni.required(),
    address: address.optional(),
    state: state.required(),
});
const getUserSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createUserSchema,
    updateUserSchema,
    getUserSchema,
};
