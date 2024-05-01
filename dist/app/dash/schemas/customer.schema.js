"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const ruc = joi_1.default.string().min(11);
const companyName = joi_1.default.string().min(2).max(150);
const urlIdentifier = joi_1.default.string().min(1).max(100);
const description = joi_1.default.string();
const state = joi_1.default.boolean();
const createAt = joi_1.default.date();
const createCustomerSchema = joi_1.default.object({
    ruc: ruc.required(),
    companyName: companyName.required(),
    urlIdentifier: urlIdentifier.required(),
    description: description.optional(),
    state: state.required(),
    createdAt: createAt.optional(),
});
const updateCustomerSchema = joi_1.default.object({
    ruc: ruc.required(),
    companyName: companyName.required(),
    urlIdentifier: urlIdentifier.required(),
    description: description.optional(),
});
const updateStateCustomerSchema = joi_1.default.object({
    state: state.required(),
});
const getCustomerByUrlSchema = joi_1.default.object({
    urlIdentifier: urlIdentifier.required(),
});
const getCustomerByID = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createCustomerSchema,
    updateCustomerSchema,
    updateStateCustomerSchema,
    getCustomerByUrlSchema,
    getCustomerByID,
};
