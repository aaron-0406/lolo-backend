"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const type = joi_1.default.string().max(200);
const customerHasBankId = joi_1.default.number();
const visible = joi_1.default.boolean();
const createJudicialObsTypeSchema = joi_1.default.object({
    type: type.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialObsTypeSchema = joi_1.default.object({
    type: type.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getJudicialObsTypeByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialObsTypeByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getJudicialObsTypeByCHBSchemaQuery = joi_1.default.object({
    visible,
}).options({ abortEarly: true });
exports.default = {
    createJudicialObsTypeSchema,
    updateJudicialObsTypeSchema,
    getJudicialObsTypeByIDSchema,
    getJudicialObsTypeByCHBSchema,
    getJudicialObsTypeByCHBSchemaQuery,
};
