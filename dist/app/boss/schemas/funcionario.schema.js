"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(1).max(150);
const createAt = joi_1.default.date();
const bankId = joi_1.default.number();
const createFuncionarioSchema = joi_1.default.object({
    name: name.required(),
    createdAt: createAt.optional(),
    bankId: bankId.required(),
});
const updateFuncionarioSchema = joi_1.default.object({
    name: name,
    bankId: bankId,
    createdAt: createAt,
});
const getFuncionarioSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createFuncionarioSchema,
    updateFuncionarioSchema,
    getFuncionarioSchema,
};
