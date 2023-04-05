"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendXlsxEmail = exports.deleteProductSchema = exports.createProductSchema = exports.deleteClientsSchema = exports.createClientsSchema = exports.excelFileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const file = joi_1.default.string().required().messages({
    "any.required": "Se debe mandar un archivo",
});
const customerId = joi_1.default.number().required().messages({
    "any.required": "Se debe mandar un archivo",
});
exports.excelFileSchema = joi_1.default.object({
    file,
    customerId,
});
const clientSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    code: joi_1.default.string().required(),
    funcionarioId: joi_1.default.number().required(),
    cityId: joi_1.default.number().required(),
});
const productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    code: joi_1.default.string().required(),
    clientName: joi_1.default.string().required(),
    state: joi_1.default.string().empty().allow("").required(),
    clientCode: joi_1.default.string().required(),
    customerId: joi_1.default.number().integer().required(),
});
exports.createClientsSchema = joi_1.default.object({
    clients: joi_1.default.array().items(clientSchema).min(1),
    customerUserId: joi_1.default.number().required(),
    customerHasBankId: joi_1.default.number().required(),
    idBank: joi_1.default.number().required(),
});
exports.deleteClientsSchema = joi_1.default.object({
    clients: joi_1.default.array().items(joi_1.default.number().integer().positive()),
    customerHasBankId: joi_1.default.number().required(),
    idBank: joi_1.default.number().required(),
});
exports.createProductSchema = joi_1.default.object({
    products: joi_1.default.array().items(productSchema).min(1),
    customerUserId: joi_1.default.number().required(),
    customerHasBankId: joi_1.default.number().required(),
    idBank: joi_1.default.number().required(),
});
exports.deleteProductSchema = joi_1.default.object({
    products: joi_1.default.array().items(joi_1.default.string()),
});
exports.sendXlsxEmail = joi_1.default.object({
    usersId: joi_1.default.array().items(joi_1.default.number()),
    clientsAdded: joi_1.default.array().items(joi_1.default.object()),
    clientsDeleted: joi_1.default.array().items(joi_1.default.object()),
    productsAdded: joi_1.default.array().items(joi_1.default.object()),
    productsCastigo: joi_1.default.array().items(joi_1.default.object()),
    productsDeleted: joi_1.default.array().items(joi_1.default.object()),
});
