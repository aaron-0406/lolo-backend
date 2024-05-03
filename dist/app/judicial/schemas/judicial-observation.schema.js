"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const comment = joi_1.default.string();
const customerHasBankId = joi_1.default.number();
const judicialObsTypeId = joi_1.default.number();
const judicialFileCaseId = joi_1.default.number();
const date = joi_1.default.date();
const visible = joi_1.default.boolean();
const createJudicialObservationSchema = joi_1.default.object({
    judicialObsTypeId: judicialObsTypeId.required(),
    customerHasBankId: customerHasBankId.required(),
    comment: comment.required(),
    date: date.required(),
    judicialCaseFileId: judicialFileCaseId.required(),
});
const updateJudicialObservationSchema = joi_1.default.object({
    comment: comment.required(),
    judicialObsTypeId: judicialObsTypeId.required(),
    date: date.required(),
});
const getJudicialObservationByIDSchema = joi_1.default.object({
    id: id.required(),
});
const createJudicialObservationParamSchema = joi_1.default.object({
    code: joi_1.default.string().required(),
    idCustomer: joi_1.default.number().required(),
});
const updateJudicialObservationParamSchema = joi_1.default.object({
    id: id.required(),
    code: joi_1.default.string().required(),
    idCustomer: joi_1.default.number().required(),
});
const getJudicialObservationByCHBSchema = joi_1.default.object({
    fileCase: joi_1.default.number().required(),
});
const getJudicialObservationByCHBSchemaQuery = joi_1.default.object({
    visible,
}).options({ abortEarly: true });
exports.default = {
    createJudicialObservationSchema,
    updateJudicialObservationSchema,
    getJudicialObservationByCHBSchema,
    getJudicialObservationByIDSchema,
    createJudicialObservationParamSchema,
    updateJudicialObservationParamSchema,
    getJudicialObservationByCHBSchemaQuery,
};
