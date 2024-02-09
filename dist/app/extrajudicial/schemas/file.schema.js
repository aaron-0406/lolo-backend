"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const code = joi_1.default.number();
const idCustomer = joi_1.default.number();
const chb = joi_1.default.number();
const tagId = joi_1.default.number();
const createFileSchema = joi_1.default.object({
    idCustomer,
    chb,
    code,
    id,
    tagId,
});
const deleteFileSchema = joi_1.default.object({
    idCustomer,
    chb,
    code,
    id,
});
const getFileSchema = joi_1.default.object({
    idCustomer,
    chb,
    code,
    id,
});
exports.default = { createFileSchema, deleteFileSchema, getFileSchema };
