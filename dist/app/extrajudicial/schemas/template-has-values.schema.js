"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().required();
const templateId = joi_1.default.number().required();
const name = joi_1.default.string().required();
const values = joi_1.default.array().required();
const createTemplateHasValuesSchema = joi_1.default.object({
    name,
    templateId,
    values,
});
const updateTemplateHasValuesSchema = joi_1.default.object({
    name,
    values,
});
const getTemplateHasValuesByIdSchema = joi_1.default.object({
    id,
});
exports.default = {
    createTemplateHasValuesSchema,
    updateTemplateHasValuesSchema,
    getTemplateHasValuesByIdSchema,
};
