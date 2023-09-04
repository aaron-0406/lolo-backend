"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const subject = joi_1.default.string().min(1).max(150);
const createJudicialSubjectSchema = joi_1.default.object({
    subject,
});
const updateJudicialSubjectSchema = joi_1.default.object({
    subject: subject.required(),
});
const getJudicialSubjectByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createJudicialSubjectSchema,
    updateJudicialSubjectSchema,
    getJudicialSubjectByIDSchema,
};
