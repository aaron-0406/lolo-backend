"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareExcelToSendEmailSchemas = exports.excelFilesSchemas = void 0;
const joi_1 = __importDefault(require("joi"));
exports.excelFilesSchemas = joi_1.default.object({
    prevFile: joi_1.default.string().required(),
    newFile: joi_1.default.string().required(),
});
exports.compareExcelToSendEmailSchemas = joi_1.default.object({
    fileData: joi_1.default.object({
        fileName: joi_1.default.string().required(),
        fileSize: joi_1.default.number().required(),
    }).required(),
    users: joi_1.default.array().items(joi_1.default.object({
        id: joi_1.default.number().required(),
        name: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        phone: joi_1.default.string().optional(),
        dni: joi_1.default.string().optional(),
        email: joi_1.default.string().required(),
        state: joi_1.default.number().optional(),
    })).required(),
});
