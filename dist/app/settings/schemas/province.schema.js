"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string();
const code = joi_1.default.string();
const departmentId = joi_1.default.number();
const createProvinceSchema = joi_1.default.object({
    name: name.required(),
    code: code.required(),
    departmentId: departmentId.required(),
});
const updateProvinceSchema = joi_1.default.object({
    name: name.required(),
    code: code.required(),
    departmentId: departmentId.required(),
});
const getProvinceSchema = joi_1.default.object({
    id: id.required(),
});
const getProvinceByDepartmentSchema = joi_1.default.object({
    departmentId: departmentId.required(),
});
exports.default = {
    createProvinceSchema,
    updateProvinceSchema,
    getProvinceSchema,
    getProvinceByDepartmentSchema
};
