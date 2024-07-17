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
const originalName = joi_1.default.string();
const page = joi_1.default.number().required().messages({
    "number.base": "El campo page es inválido",
    "any.required": "El campo page es requerido.",
});
const limit = joi_1.default.number().required().messages({
    "number.base": "El campo limit es inválido",
    "any.required": "El campo limit es requerido.",
});
const filter = joi_1.default.string().optional();
const createFileSchema = joi_1.default.object({
    idCustomer,
    chb,
    code,
    id,
    tagId,
});
const updateFileSchema = joi_1.default.object({
    originalName: originalName.required(),
    tagId: tagId.required(),
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
const getFileByIdSchema = joi_1.default.object({
    id,
});
const getFileFilterByIdAndChbSchema = joi_1.default.object({
    id,
    chb,
});
const getUserLogsFilterByCustomerIdQuery = joi_1.default.object({
    page,
    limit,
    filter
}).options({ abortEarly: true });
exports.default = {
    createFileSchema,
    updateFileSchema,
    deleteFileSchema,
    getFileSchema,
    getFileByIdSchema,
    getFileFilterByIdAndChbSchema,
    getUserLogsFilterByCustomerIdQuery
};
