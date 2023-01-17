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
const idBank = joi_1.default.number();
const createClientSchema = joi_1.default.object({
    code: code.required(),
    negotiationId,
    dniOrRuc: dniOrRuc.required(),
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
const getClientByBank = joi_1.default.object({
    idBank,
});
const deleteClientByCodeSchema = joi_1.default.object({
    code: code.required(),
    chb: customerHasBankId.required(),
    idBank,
});
exports.default = {
    createClientSchema,
    getClientByBank,
    updateClientSchema,
    getClientByCHBSchema,
    getClientByCodeSchema,
    deleteClientByCodeSchema,
};
