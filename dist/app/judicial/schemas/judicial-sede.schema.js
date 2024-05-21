"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const sede = joi_1.default.string().max(200);
const customerHasBankId = joi_1.default.number();
const visible = joi_1.default.boolean();
const createJudicialSedeSchema = joi_1.default.object({
    sede: sede.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialSedeSchema = joi_1.default.object({
    sede: sede.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getJudicialSedeByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialSedeByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getJudicialSedeByCHBSchemaQuery = joi_1.default.object({
    visible,
}).options({ abortEarly: true });
exports.default = {
    createJudicialSedeSchema,
    updateJudicialSedeSchema,
    getJudicialSedeByIDSchema,
    getJudicialSedeByCHBSchema,
    getJudicialSedeByCHBSchemaQuery,
};
