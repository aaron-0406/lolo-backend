"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const addressName = joi_1.default.string().min(2).max(100);
const ip = joi_1.default.string().min(2).max(100);
const state = joi_1.default.boolean();
const customerId = joi_1.default.number();
const createIpAddressSchema = joi_1.default.object({
    addressName: addressName.required(),
    ip: ip.required(),
    state: state.required(),
    customerId: customerId.required(),
});
const updateIpAddressStateSchema = joi_1.default.object({
    state: state.required(),
});
const updateIpAddressSchema = joi_1.default.object({
    addressName: addressName.required(),
    ip: ip.required(),
    state: state.required(),
    customerId: customerId.required(),
});
const getIpAddressByIdSchema = joi_1.default.object({
    id: id.required(),
    customerId: customerId.required(),
});
const getIpAddressByIpSchema = joi_1.default.object({
    ip: ip.required(),
    customerId: customerId.required(),
});
const getIpAddressesByCustomerIdSchema = joi_1.default.object({
    customerId: customerId.required(),
});
const getIpAddressesByIdSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createIpAddressSchema,
    updateIpAddressStateSchema,
    updateIpAddressSchema,
    getIpAddressByIdSchema,
    getIpAddressByIpSchema,
    getIpAddressesByCustomerIdSchema,
    getIpAddressesByIdSchema,
};
