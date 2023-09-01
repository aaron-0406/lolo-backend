"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const court = joi_1.default.string().min(1).max(150);
const customerHasBankId = joi_1.default.number();
const createJudicialCourtSchema = joi_1.default.object({
    court: court.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialCourtSchema = joi_1.default.object({
    court: court.optional(),
});
const getJudicialCourtByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createJudicialCourtSchema,
    updateJudicialCourtSchema,
    getJudicialCourtByIDSchema,
};
