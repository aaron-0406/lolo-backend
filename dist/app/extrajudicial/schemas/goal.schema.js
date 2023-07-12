"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().required();
const week = joi_1.default.number();
const startDate = joi_1.default.date();
const limit = joi_1.default.number().required();
const page = joi_1.default.number().required();
const getGoalQuerySchema = joi_1.default.object({
    limit,
    page,
}).options({ abortEarly: true });
const createGoalSchema = joi_1.default.object({
    startDate: startDate.required(),
    week: week.required(),
}).options({ abortEarly: true });
const updateGoalSchema = joi_1.default.object({
    startDate: startDate.required(),
    week: week.optional(),
}).options({ abortEarly: true });
const getGoalByIdSchema = joi_1.default.object({
    id,
}).options({ abortEarly: true });
exports.default = {
    createGoalSchema,
    getGoalByIdSchema,
    updateGoalSchema,
    getGoalQuerySchema,
};
