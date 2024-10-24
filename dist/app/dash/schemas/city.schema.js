"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const customerId = joi_1.default.number();
const name = joi_1.default.string().min(1).max(50);
const createCitySchema = joi_1.default.object({
    name: name.required(),
    customerId: customerId.required(),
});
const updateCitySchema = joi_1.default.object({
    name: name,
    customerId: customerId.required(),
});
const getCitySchema = joi_1.default.object({
    id: id.required(),
});
const getCitiesSchema = joi_1.default.object({
    customerId: customerId.required(),
});
exports.default = {
    createCitySchema,
    updateCitySchema,
    getCitySchema,
    getCitiesSchema,
};
