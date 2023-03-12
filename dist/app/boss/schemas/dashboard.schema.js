"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excelFileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const file = joi_1.default.string().required().messages({
    "any.required": "Se debe mandar un archivo",
});
const customerId = joi_1.default.number().required().messages({
    "any.required": "Se debe mandar un archivo",
});
exports.excelFileSchema = joi_1.default.object({
    file,
    customerId,
});
