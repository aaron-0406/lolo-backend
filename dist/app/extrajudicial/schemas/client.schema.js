"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const code = joi_1.default.string().min(1).max(50);
const negotiationId = joi_1.default.number().required();
const dniOrRuc = joi_1.default.string().min(1).max(20);
const name = joi_1.default.string().min(1).max(200);
const salePerimeter = joi_1.default.string();
const phone = joi_1.default.string().min(1).max(300);
const email = joi_1.default.string().min(1).max(300);
const createdAt = joi_1.default.date();
const cityId = joi_1.default.number();
const funcionarioId = joi_1.default.number();
const customerUserId = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const idCustomer = joi_1.default.number();
const page = joi_1.default.number().required().messages({
    "number.base": "El campo page es inválido",
    "any.required": "El campo page es requerido.",
});
const limit = joi_1.default.number().required().messages({
    "number.base": "El campo limit es inválido",
    "any.required": "El campo limit es requerido.",
});
const filter = joi_1.default.string().optional().min(3).messages({
    "string.base": "El campo filter es inválido",
    "any.required": "El campo filter es requerido.",
    "string.min": "El campo debe ser de mínimo 3 caracteres",
    "string.empty": "El campo filter no puede estar vácio",
});
const createClientSchema = joi_1.default.object({
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
const updateClientSchema = joi_1.default.object({
    negotiationId,
    dniOrRuc: dniOrRuc,
    name: name,
    salePerimeter: salePerimeter.optional().empty("").allow(""),
    phone: phone.optional().empty("").allow(""),
    email: email.optional().empty("").allow(""),
    createdAt: createdAt,
    customerUserId: customerUserId,
    cityId: cityId,
    funcionarioId: funcionarioId,
});
const getClientByCodeSchema = joi_1.default.object({
    code: code.required(),
    chb: customerHasBankId.required(),
});
const getClientByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getClientByCHBSchemaQuery = joi_1.default.object({
    page,
    filter,
    limit,
}).options({ abortEarly: true });
const getClientByCustomer = joi_1.default.object({
    idCustomer,
});
const deleteClientByCodeSchema = joi_1.default.object({
    code: code.required(),
    chb: customerHasBankId.required(),
    idCustomer,
});
exports.default = {
    createClientSchema,
    getClientByCustomer,
    updateClientSchema,
    getClientByCHBSchema,
    getClientByCodeSchema,
    deleteClientByCodeSchema,
    getClientByCHBSchemaQuery,
};
