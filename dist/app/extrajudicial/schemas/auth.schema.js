"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string().email().required();
const password = joi_1.default.string().required();
const newPassword = joi_1.default.string().required();
const repeatPassword = joi_1.default.string().required();
const customerId = joi_1.default.number().required().min(1);
const loginSchema = joi_1.default.object({
    email,
    password,
    customerId,
}).options({ abortEarly: true });
const changePasswordSchema = joi_1.default.object({
    newPassword,
    repeatPassword,
}).options({ abortEarly: true });
exports.default = { loginSchema, changePasswordSchema };
