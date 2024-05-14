"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const customerId = joi_1.default.number();
const users = joi_1.default.string().required();
const actions = joi_1.default.string().required();
const page = joi_1.default.number().required().messages({
    "number.base": "El campo page es inválido",
    "any.required": "El campo page es requerido.",
});
const limit = joi_1.default.number().required().messages({
    "number.base": "El campo limit es inválido",
    "any.required": "El campo limit es requerido.",
});
const getUserLogsByCustomerIdchema = joi_1.default.object({
    customerId: customerId.required(),
});
const getUserLogsFilterByCustomerIdSchema = joi_1.default.object({
    customerId: customerId.required(),
});
const getUserLogsFilterByCustomerIdQuery = joi_1.default.object({
    page,
    limit,
    actions,
    users,
}).options({ abortEarly: true });
exports.default = {
    getUserLogsByCustomerIdchema,
    getUserLogsFilterByCustomerIdSchema,
    getUserLogsFilterByCustomerIdQuery,
};
