"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(1).max(100);
const createAt = joi_1.default.date();
const createNegotiationSchema = joi_1.default.object({
    name: name.required(),
    createdAt: createAt.optional(),
});
const updateNegotiationSchema = joi_1.default.object({
    name: name,
    createdAt: createAt,
});
const getNegotiationSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = { createNegotiationSchema, updateNegotiationSchema, getNegotiationSchema };
