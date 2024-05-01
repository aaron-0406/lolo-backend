"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string().email().required();
const password = joi_1.default.string().required();
const loginSchema = joi_1.default.object({
    email,
    password,
});
exports.default = { loginSchema };
