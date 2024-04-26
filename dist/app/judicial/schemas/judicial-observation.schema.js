"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const date = joi_1.default.date();
const comment = joi_1.default.string().min(1);
const judicialCaseFileId = joi_1.default.number();
const judicialObsTypeId = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const visible = joi_1.default.boolean();
const createJudicialObservationSchema = joi_1.default.object({
    date: date.required(),
    comment: comment.required(),
    judicialCaseFileId: judicialCaseFileId.required(),
    judicialObsTypeId: judicialObsTypeId.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialObservationSchema = joi_1.default.object({
    date: date.required(),
    comment: comment.required(),
    judicialObsTypeId: judicialObsTypeId.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getJudicialObservationByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialObservationByCHBAndJudicialCaseSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
    judicialCaseId: customerHasBankId.required(),
});
const getJudicialObservationByCHBAndJudicialCaseSchemaQuery = joi_1.default.object({
    visible,
}).options({ abortEarly: true });
exports.default = {
    createJudicialObservationSchema,
    updateJudicialObservationSchema,
    getJudicialObservationByIDSchema,
    getJudicialObservationByCHBAndJudicialCaseSchema,
    getJudicialObservationByCHBAndJudicialCaseSchemaQuery,
};
