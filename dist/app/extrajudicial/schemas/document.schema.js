"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().required();
const usersId = joi_1.default.array().required();
const createDocumentSchema = joi_1.default.object({
    templateHasValuesId: id,
    usersId,
});
exports.default = {
    createDocumentSchema,
};
