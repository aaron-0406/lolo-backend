"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const productName = joi_1.default.string().max(200);
const customerHasBankId = joi_1.default.number();
const visible = joi_1.default.boolean();
const createExtProductNameSchema = joi_1.default.object({
    productName: productName.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateExtProductNameSchema = joi_1.default.object({
    productName: productName.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getExtProductNameByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getExtProductNameByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getExtProductNameByCHBSchemaQuery = joi_1.default.object({
    visible,
}).options({ abortEarly: true });
exports.default = {
    createExtProductNameSchema,
    updateExtProductNameSchema,
    getExtProductNameByCHBSchema,
    getExtProductNameByIDSchema,
    getExtProductNameByCHBSchemaQuery,
};
