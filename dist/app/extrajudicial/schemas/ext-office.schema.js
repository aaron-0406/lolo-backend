"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(2).max(200);
const address = joi_1.default.string().min(2).max(200);
const customerId = joi_1.default.number();
const cityId = joi_1.default.number();
const state = joi_1.default.boolean();
const createOfficeSchema = joi_1.default.object({
    name: name.required(),
    address: address.required(),
    state: state.required(),
    customerId: customerId.required(),
    cityId: cityId.required(),
});
const updateOfficeStateSchema = joi_1.default.object({
    state: state.required(),
});
const updateOfficeSchema = joi_1.default.object({
    name: name.required(),
    address: address.required(),
    state: state.required(),
    customerId: customerId.required(),
    cityId: cityId.required(),
});
const getOfficeByIdSchema = joi_1.default.object({
    id: id.required(),
    customerId: customerId.required(),
});
const getOfficesByCustomerIdSchema = joi_1.default.object({
    customerId: customerId.required(),
});
const getOfficesByIdSchema = joi_1.default.object({
    id: id.required(),
});
const getOfficesByCityIdSchema = joi_1.default.object({
    cityId: cityId.required(),
});
exports.default = {
    createOfficeSchema,
    updateOfficeStateSchema,
    updateOfficeSchema,
    getOfficeByIdSchema,
    getOfficesByCustomerIdSchema,
    getOfficesByIdSchema,
    getOfficesByCityIdSchema,
};
