"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const type = joi_1.default.string().min(1).max(200);
const customerHasBankId = joi_1.default.number();
const createAddressTypeSchema = joi_1.default.object({
    type: type.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateAddressTypeSchema = joi_1.default.object({
    type: type.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getAddressTypeByChbSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getAddressTypeByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getAddressTypeByIDAndCHBSchema = joi_1.default.object({
    id: id.required(),
    chb: customerHasBankId.required(),
});
exports.default = {
    createAddressTypeSchema,
    updateAddressTypeSchema,
    getAddressTypeByChbSchema,
    getAddressTypeByIDSchema,
    getAddressTypeByIDAndCHBSchema,
};
