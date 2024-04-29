"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(1).max(100);
const description = joi_1.default.string();
const state = joi_1.default.boolean();
const createAt = joi_1.default.date();
const createModuleSchema = joi_1.default.object({
    id: id.required(),
    name: name.required(),
    description: description.optional(),
    state: state.required(),
    createdAt: createAt.optional(),
});
const getModuleSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = { createModuleSchema, getModuleSchema };
