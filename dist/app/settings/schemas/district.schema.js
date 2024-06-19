"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string();
const code = joi_1.default.string();
const provinceId = joi_1.default.number();
const createDistrictSchema = joi_1.default.object({
    name: name.required(),
    code: code.required(),
    provinceId: provinceId.required(),
});
const updateDistrictSchema = joi_1.default.object({
    name: name.required(),
    code: code.required(),
    provinceId: provinceId.required(),
});
const getDistrictSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createDistrictSchema,
    updateDistrictSchema,
    getDistrictSchema,
};
