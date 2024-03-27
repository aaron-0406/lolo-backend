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
const createIpAddressSchema = joi_1.default.object({
    addressName: addressName.required(),
    ip: ip.required(),
    state: state.required(),
});
const updateIpAddressStateSchema = joi_1.default.object({
    state: state.required(),
});
const updateIpAddressSchema = joi_1.default.object({
    addressName: addressName.required(),
    ip: ip.optional().empty("").allow(""),
    state: state.required(),
});
const getIpAddressSchema = joi_1.default.object({
    id: id.required(),
});
const getIpAddressByIpSchema = joi_1.default.object({
    ip: ip.required(),
});
exports.default = {
    createIpAddressSchema,
    updateIpAddressStateSchema,
    updateIpAddressSchema,
    getIpAddressSchema,
    getIpAddressByIpSchema,
};
