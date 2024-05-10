"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const defendantProceduralAction = joi_1.default.string().min(1).max(150);
const customerHasBankId = joi_1.default.number();
const createJudicialBinDefendantProceduralActionSchema = joi_1.default.object({
    defendantProceduralAction: defendantProceduralAction.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialBinDefendantProceduralActionSchema = joi_1.default.object({
    defendantProceduralAction: defendantProceduralAction.required(),
});
const getJudicialBinDefendantProceduralActionByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialBinDefendantProceduralActionByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
exports.default = {
    createJudicialBinDefendantProceduralActionSchema,
    updateJudicialBinDefendantProceduralActionSchema,
    getJudicialBinDefendantProceduralActionByCHBSchema,
    getJudicialBinDefendantProceduralActionByIDSchema,
};
