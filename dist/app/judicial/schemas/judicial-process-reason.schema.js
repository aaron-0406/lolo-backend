"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const reason = joi_1.default.string().min(1).max(150);
const createJudicialReasonProcessSchema = joi_1.default.object({
    reason: reason.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialReasonProcessSchema = joi_1.default.object({
    reason: reason.optional(),
});
const getJudicialReasonProcessByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialReasonProcessByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
exports.default = {
    createJudicialReasonProcessSchema,
    updateJudicialReasonProcessSchema,
    getJudicialReasonProcessByIDSchema,
    getJudicialReasonProcessByCHBSchema,
};
