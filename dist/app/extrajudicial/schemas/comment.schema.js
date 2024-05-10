"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const comment = joi_1.default.string().min(1);
const negotiation = joi_1.default.string().min(1).max(100);
const managementActionId = joi_1.default.number();
const date = joi_1.default.date();
const hour = joi_1.default.date();
const customerUserId = joi_1.default.number();
const clientId = joi_1.default.number();
const createCommentSchema = joi_1.default.object({
    comment: comment.required(),
    negotiation: negotiation.required(),
    managementActionId: managementActionId.optional().empty("").allow(""),
    date: date.required(),
    hour: hour.optional(),
    customerUserId: customerUserId.required(),
    clientId: clientId.required(),
});
const updateCommentSchema = joi_1.default.object({
    comment: comment.required(),
    negotiation: negotiation.required(),
    managementActionId: managementActionId.optional().empty("").allow(""),
    date: date.required(),
    hour: hour.optional(),
    customerUserId: customerUserId.required(),
});
const getCommentByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getCommentByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createCommentSchema,
    updateCommentSchema,
    getCommentByClientIDSchema,
    getCommentByIDSchema,
};
