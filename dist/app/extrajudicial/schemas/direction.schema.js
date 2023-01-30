"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const direction = joi_1.default.string().min(1).max(200);
const createdAt = joi_1.default.date();
const clientId = joi_1.default.number();
const type = joi_1.default.string().required();
const createDirectionSchema = joi_1.default.object({
    direction: direction.required(),
    createdAt: createdAt.optional(),
    clientId: clientId.required(),
    type
});
const updateDirectionSchema = joi_1.default.object({
    direction: direction.required(),
    createdAt: createdAt.optional(),
    type,
});
const getDirectionByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getDirectionByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createDirectionSchema,
    updateDirectionSchema,
    getDirectionByClientIDSchema,
    getDirectionByIDSchema,
};
