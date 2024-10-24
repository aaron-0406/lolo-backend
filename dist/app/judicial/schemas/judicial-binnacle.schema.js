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
const index = joi_1.default.number().optional().empty("").allow("");
const resolutionDate = joi_1.default.date().optional().empty("").allow("");
const entryDate = joi_1.default.date().optional().empty("").allow("");
const notificationType = joi_1.default.string().optional().empty("").allow("");
const acto = joi_1.default.string().optional().empty("").allow("");
const fojas = joi_1.default.number().optional().empty("").allow("");
const folios = joi_1.default.number().optional().empty("").allow("");
const provedioDate = joi_1.default.date().optional().empty("").allow("");
const userDescription = joi_1.default.string().optional().empty("").allow("");
const createdBy = joi_1.default.number().optional().empty("").allow("");
const totalTariff = joi_1.default.number().optional().empty(0).allow(0).messages({
    "number.empty": "El debe seleccionar un proceso",
});
const tariffHistory = joi_1.default.string().optional().empty("").allow("").messages({
    "string.empty": "No se selecciono ningun proceso",
});
const createJudicialBinnacleSchema = joi_1.default.object({
    binnacleTypeId: binnacleTypeId.required(),
    judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
    customerHasBankId: customerHasBankId.required(),
    lastPerformed: lastPerformed.required(),
    date: date.required(),
    totalTariff: totalTariff.required(),
    tariffHistory: tariffHistory.required(),
    judicialFileCaseId: judicialFileCaseId.required(),
    index: index.required(),
    resolutionDate: resolutionDate.required(),
    entryDate: entryDate.required(),
    notificationType: notificationType.required(),
    acto: acto.required(),
    fojas: fojas.required(),
    folios: folios.required(),
    provedioDate: provedioDate.required(),
    userDescription: userDescription.required(),
    createdBy: createdBy.required(),
});
const updateJudicialBinnacleSchema = joi_1.default.object({
    lastPerformed: lastPerformed.required(),
    judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
    binnacleTypeId: binnacleTypeId.required(),
    date: date.required(),
    index: index.required(),
    resolutionDate: resolutionDate.required(),
    entryDate: entryDate.required(),
    notificationType: notificationType.required(),
    acto: acto.required(),
    fojas: fojas.required(),
    folios: folios.required(),
    provedioDate: provedioDate.required(),
    userDescription: userDescription.required(),
    createdBy: createdBy.required(),
    totalTariff: totalTariff.required(),
    tariffHistory: tariffHistory.required(),
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
const updateJudicialBinnacleTariffBodySchema = joi_1.default.object({
    totalTariff: totalTariff,
    tariffHistory: tariffHistory,
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
    updateJudicialBinnacleTariffBodySchema,
    getJudicialBinnacleByCHBSchemaQuery,
};
