"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const numberCaseFile = joi_1.default.string().max(150);
const judgmentNumber = joi_1.default.number();
const secretary = joi_1.default.string().max(150);
const amountDemandedSoles = joi_1.default.number().positive();
const amountDemandedDollars = joi_1.default.number().positive();
const cautionaryCode = joi_1.default.string().max(150);
const errandCode = joi_1.default.string().max(150);
const judicialVenue = joi_1.default.string().max(150);
const judge = joi_1.default.string().max(150);
const demandDate = joi_1.default.date();
const clientId = joi_1.default.number();
const customerUserId = joi_1.default.number();
const judicialCourtId = joi_1.default.number().positive();
const judicialSubjectId = joi_1.default.number().positive();
const judicialProceduralWayId = joi_1.default.number().positive();
const customerHasBankId = joi_1.default.number().positive();
const createJudicialCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.optional().empty("").allow(""),
    secretary: secretary.optional().empty("").allow(""),
    amountDemandedSoles: amountDemandedSoles.optional().empty("").allow(""),
    amountDemandedDollars: amountDemandedDollars.optional().empty("").allow(""),
    cautionaryCode: cautionaryCode.optional().empty("").allow(""),
    errandCode: errandCode.optional().empty("").allow(""),
    judicialVenue: judicialVenue.optional().empty("").allow(""),
    judge: judge.optional().empty("").allow(""),
    demandDate: demandDate.optional().empty("").allow(""),
    judicialCourtId: judicialCourtId.required(),
    judicialSubjectId: judicialSubjectId.required(),
    judicialProceduralWayId: judicialProceduralWayId.required(),
    clientId: clientId.required(),
    customerUserId: customerUserId.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.optional().empty("").allow(""),
    secretary: secretary.optional().empty("").allow(""),
    amountDemandedSoles: amountDemandedSoles.optional().empty("").allow(""),
    amountDemandedDollars: amountDemandedDollars.optional().empty("").allow(""),
    cautionaryCode: cautionaryCode.optional().empty("").allow(""),
    errandCode: errandCode.optional().empty("").allow(""),
    judicialVenue: judicialVenue.optional().empty("").allow(""),
    judge: judge.optional().empty("").allow(""),
    demandDate: demandDate.optional().empty("").allow(""),
    customerUserId: customerUserId.required(),
    judicialCourtId: judicialCourtId.required(),
    judicialSubjectId: judicialSubjectId.required(),
    judicialProceduralWayId: judicialProceduralWayId.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getJudicialCaseFileByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getJudicialCaseFileByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialCaseFileByNumberCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
});
exports.default = {
    createJudicialCaseFileSchema,
    updateJudicialCaseFileSchema,
    getJudicialCaseFileByClientIDSchema,
    getJudicialCaseFileByNumberCaseFileSchema,
    getJudicialCaseFileByIDSchema,
};
