"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const contactType = joi_1.default.string().max(200);
const customerHasBankId = joi_1.default.number();
const visible = joi_1.default.boolean();
const createExtContactTypeSchema = joi_1.default.object({
    contactType: contactType.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateExtContactTypeSchema = joi_1.default.object({
    contactType: contactType.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getExtContactTypeByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getExtContactTypeByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getContactTypeByCHBSchemaQuery = joi_1.default.object({
    visible,
}).options({ abortEarly: true });
exports.default = {
    createExtContactTypeSchema,
    updateExtContactTypeSchema,
    getExtContactTypeByCHBSchema,
    getExtContactTypeByIDSchema,
    getContactTypeByCHBSchemaQuery,
};
