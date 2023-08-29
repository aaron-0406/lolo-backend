"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(1).max(150);
const phone = joi_1.default.string().max(150);
const email = joi_1.default.string().max(150);
const createdAt = joi_1.default.date();
const clientId = joi_1.default.number();
const numberCaseFile = joi_1.default.number();
const judgmentNumber = joi_1.default.number();
const secretary = joi_1.default.string().max(150);
const amountDemandedSoles = joi_1.default.number();
const cautionaryCode = joi_1.default.string().max(150);
const errandCode = joi_1.default.string().max(150);
const judicialVenue = joi_1.default.string().max(150);
const judge = joi_1.default.string().max(150);
const demandDate = joi_1.default.date();
const judicialCourtId = joi_1.default.number().positive();
const judicialSubjectId = joi_1.default.number().positive();
const judicialProceduralWayId = joi_1.default.number().positive();
const createJudicialCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.required(),
    secretary: secretary.required(),
    amountDemandedSoles: amountDemandedSoles.required(),
    cautionaryCode: cautionaryCode.required(),
    errandCode: errandCode.required(),
    judicialVenue: judicialVenue.required(),
    judge: judge.required(),
    demandDate: demandDate.required(),
    judicialCourtId: judicialCourtId.required(),
    judicialSubjectId: judicialSubjectId.required(),
    judicialProceduralWayId: judicialProceduralWayId.required(),
    createdAt: createdAt.optional(),
    clientId: clientId.required(),
});
const updateJudicialCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.required(),
    secretary: secretary.required(),
    amountDemandedSoles: amountDemandedSoles.required(),
    cautionaryCode: cautionaryCode.required(),
    errandCode: errandCode.required(),
    judicialVenue: judicialVenue.required(),
    judge: judge.required(),
    demandDate: demandDate.required(),
    judicialCourtId: judicialCourtId.required(),
    judicialSubjectId: judicialSubjectId.required(),
    judicialProceduralWayId: judicialProceduralWayId.required(),
    createdAt: createdAt.optional(),
});
const getJudicialCaseFileByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getJudicialCaseFileByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createJudicialCaseFileSchema,
    updateJudicialCaseFileSchema,
    getJudicialCaseFileByClientIDSchema,
    getJudicialCaseFileByIDSchema,
};
