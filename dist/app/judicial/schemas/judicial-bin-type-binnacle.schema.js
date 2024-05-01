"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const typeBinnacle = joi_1.default.string().min(1).max(150);
const customerHasBankId = joi_1.default.number();
const createJudicialBinTypeBinnacleSchema = joi_1.default.object({
    typeBinnacle: typeBinnacle.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialBinTypeBinnacleSchema = joi_1.default.object({
    typeBinnacle: typeBinnacle.required(),
});
const getJudicialBinTypeBinnacleByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialBinTypeBinnacleByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
exports.default = {
    createJudicialBinTypeBinnacleSchema,
    updateJudicialBinTypeBinnacleSchema,
    getJudicialBinTypeBinnacleByCHBSchema,
    getJudicialBinTypeBinnacleByIDSchema,
};
