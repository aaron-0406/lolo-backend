"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const code = joi_1.default.number();
const idBank = joi_1.default.number();
const createFileSchema = joi_1.default.object({
    id,
    code,
    idBank,
});
const getFileSchema = joi_1.default.object({
    id,
    idBank,
    code,
});
exports.default = { createFileSchema, getFileSchema };
