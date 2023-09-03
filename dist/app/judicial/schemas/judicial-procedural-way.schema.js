"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const proceduralWay = joi_1.default.string().min(1).max(150);
const customerHasBankId = joi_1.default.number();
const createJudicialProceduralWaySchema = joi_1.default.object({
    proceduralWay: proceduralWay.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialProceduralWaySchema = joi_1.default.object({
    proceduralWay: proceduralWay.optional(),
});
const getJudicialProceduralWayByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialProcedurakWayByCHBSchema = joi_1.default.object({
    chb: id.required(),
});
exports.default = {
    getJudicialProcedurakWayByCHBSchema,
    createJudicialProceduralWaySchema,
    updateJudicialProceduralWaySchema,
    getJudicialProceduralWayByIDSchema,
};
