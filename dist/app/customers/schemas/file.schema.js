"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const createFileSchema = joi_1.default.object({
    id,
});
const getFileSchema = joi_1.default.object({
    id,
});
exports.default = { createFileSchema, getFileSchema };
