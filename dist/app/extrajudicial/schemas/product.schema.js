"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = exports.getProductsByCustomerIdSchema = exports.getProductByCodeSchema = exports.getProductByIdSchema = exports.getProductsByClientCodeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const code = joi_1.default.string().required();
const state = joi_1.default.string().required();
const id = joi_1.default.number().required();
const customerId = joi_1.default.number().required();
const name = joi_1.default.string().required();
const negotiationId = joi_1.default.number().required();
const clientId = joi_1.default.number().required();
exports.getProductsByClientCodeSchema = joi_1.default.object({
    clientId,
});
exports.getProductByIdSchema = joi_1.default.object({
    id,
});
exports.getProductByCodeSchema = joi_1.default.object({
    code,
});
exports.getProductsByCustomerIdSchema = joi_1.default.object({
    customerId,
});
exports.createProductSchema = joi_1.default.object({
    code,
    state,
    customerId,
    name,
    negotiationId,
    clientId,
});
exports.updateProductSchema = joi_1.default.object({
    state,
    negotiationId,
    name,
});
