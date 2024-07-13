"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string();
const code = joi_1.default.string();
const createDepartmentSchema = joi_1.default.object({
    name: name.required(),
    code: code.required(),
});
const updateDepartmentSchema = joi_1.default.object({
    name: name.required(),
    code: code.required(),
});
const getDepartmentSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createDepartmentSchema,
    updateDepartmentSchema,
    getDepartmentSchema,
};
