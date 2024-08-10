"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const lastPerformed = joi_1.default.string();
const judicialBinProceduralStageId = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const binnacleTypeId = joi_1.default.number();
const judicialFileCaseId = joi_1.default.number();
const date = joi_1.default.date();
const sortBy = joi_1.default.string().optional().empty("").allow("");
const order = joi_1.default.string().optional().empty("").allow("");
const notificationType = joi_1.default.string().optional().empty("").allow("");
const userDescription = joi_1.default.string().optional().empty("").allow("");
const fojas = joi_1.default.number().optional().empty("").allow("");
const createdBy = joi_1.default.number().optional().empty("").allow("");
const createJudicialBinnacleSchema = joi_1.default.object({
    binnacleTypeId: binnacleTypeId.required(),
    judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
    customerHasBankId: customerHasBankId.required(),
    lastPerformed: lastPerformed.required(),
    date: date.required(),
    judicialFileCaseId: judicialFileCaseId.required(),
    notificationType: notificationType.required(),
    userDescription: userDescription.required(),
    fojas: fojas.required(),
    createdBy: createdBy.required(),
});
const updateJudicialBinnacleSchema = joi_1.default.object({
    lastPerformed: lastPerformed.required(),
    judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
    binnacleTypeId: binnacleTypeId.required(),
    date: date.required(),
    notificationType: notificationType.required(),
    userDescription: userDescription.required(),
    fojas: fojas.required(),
    createdBy: createdBy.required(),
});
const getJudicialBinnacleByIDSchema = joi_1.default.object({
    id: id.required(),
});
const createJudicialBinnacleParamSchema = joi_1.default.object({
    code: joi_1.default.string().required(),
    idCustomer: joi_1.default.number().required(),
});
const updateJudicialBinnacleParamSchema = joi_1.default.object({
    id: id.required(),
    code: joi_1.default.string().required(),
    idCustomer: joi_1.default.number().required(),
});
const getJudicialBinnacleByCHBSchema = joi_1.default.object({
    fileCase: joi_1.default.number().required(),
});
const getJudicialBinnacleByCHBSchemaQuery = joi_1.default.object({
    sortBy,
    order,
}).options({ abortEarly: true });
exports.default = {
    createJudicialBinnacleSchema,
    updateJudicialBinnacleSchema,
    getJudicialBinnacleByCHBSchema,
    getJudicialBinnacleByIDSchema,
    createJudicialBinnacleParamSchema,
    updateJudicialBinnacleParamSchema,
    getJudicialBinnacleByCHBSchemaQuery,
};
