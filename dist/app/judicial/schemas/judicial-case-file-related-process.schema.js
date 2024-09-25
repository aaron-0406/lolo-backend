"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const caseFileId = joi_1.default.number().required();
const regexPatternNumberFileCase = /^\d{5}-\d{4}-\d{1,4}-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
const id = joi_1.default.number();
const numberCaseFile = joi_1.default.string().regex(regexPatternNumberFileCase).messages({
    "string.pattern.base": 'El formato del código no es válido. Debe seguir el patrón "####-####-####-####-LL-LL-##".',
});
const judgmentNumber = joi_1.default.number();
const secretary = joi_1.default.string().max(150);
const amountDemandedSoles = joi_1.default.number();
const amountDemandedDollars = joi_1.default.number();
const comercialValueSoles = joi_1.default.number();
const comercialValueDollars = joi_1.default.number();
const amountAffectionSoles = joi_1.default.number();
const amountAffectionDollars = joi_1.default.number();
const cautionaryCode = joi_1.default.string().max(150);
const errandCode = joi_1.default.string().max(150);
const judicialSedeId = joi_1.default.number().positive();
const judge = joi_1.default.string().max(150);
const demandDate = joi_1.default.date();
const clientId = joi_1.default.number();
const cityId = joi_1.default.number();
const chb = joi_1.default.number();
const customerUserId = joi_1.default.number();
const judicialCourtId = joi_1.default.number().positive();
const judicialSubjectId = joi_1.default.number().positive();
const judicialProceduralWayId = joi_1.default.number().positive();
const customerHasBankId = joi_1.default.number().positive();
const bankId = joi_1.default.number();
const idJudicialCaseFileRelated = joi_1.default.number();
const qrCode = joi_1.default.string();
const page = joi_1.default.number().required().messages({
    "number.base": "El campo page es inválido",
    "any.required": "El campo page es requerido.",
});
const limit = joi_1.default.number().required().messages({
    "number.base": "El campo limit es inválido",
    "any.required": "El campo limit es requerido.",
});
const filter = joi_1.default.string().optional().messages({
    "string.base": "El campo filter es inválido",
    "any.required": "El campo filter es requerido.",
    "string.empty": "El campo filter no puede estar vácio",
});
const courts = joi_1.default.string().required();
const proceduralWays = joi_1.default.string().required();
const subjects = joi_1.default.string().required();
const users = joi_1.default.string().required();
const responsibles = joi_1.default.string().required();
const customerId = joi_1.default.number();
const chbTransferred = joi_1.default.number();
const responsibleUserId = joi_1.default.number();
const isScanValid = joi_1.default.boolean();
const wasScanned = joi_1.default.boolean();
const createJudicialCaseFileRelatedProcessSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.optional().empty("").allow(""),
    secretary: secretary.optional().empty("").allow(""),
    amountDemandedSoles: amountDemandedSoles.optional().empty("").allow(""),
    amountDemandedDollars: amountDemandedDollars.optional().empty("").allow(""),
    comercialValueSoles: comercialValueSoles.optional().empty("").allow(""),
    comercialValueDollars: comercialValueDollars.optional().empty("").allow(""),
    amountAffectionSoles: amountAffectionSoles.optional().empty("").allow(""),
    amountAffectionDollars: amountAffectionDollars.optional().empty("").allow(""),
    cautionaryCode: cautionaryCode.optional().empty("").allow(""),
    errandCode: errandCode.optional().empty("").allow(""),
    judicialSedeId: judicialSedeId.optional().empty("").allow(""),
    judge: judge.optional().empty("").allow(""),
    demandDate: demandDate.optional().empty("").allow(""),
    judicialCourtId: judicialCourtId.required(),
    judicialSubjectId: judicialSubjectId.required(),
    judicialProceduralWayId: judicialProceduralWayId.required(),
    clientId: clientId.required(),
    cityId: cityId.required(),
    customerUserId: customerUserId.required(),
    customerHasBankId: customerHasBankId.required(),
    idJudicialCaseFileRelated: idJudicialCaseFileRelated
        .optional()
        .empty("")
        .allow(""),
    bankId: bankId.optional().empty("").allow(""),
    qrCode: qrCode.optional().empty("").allow(""),
    chbTransferred: chbTransferred.optional().empty("").allow(""),
    responsibleUserId: responsibleUserId.optional().empty("").allow(""),
    isScanValid: isScanValid.optional(),
    wasScanned: wasScanned.optional(),
});
const updateJudicialCaseFileRelatedProcessSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.optional().empty("").allow(""),
    secretary: secretary.optional().empty("").allow(""),
    amountDemandedSoles: amountDemandedSoles.optional().empty("").allow(""),
    amountDemandedDollars: amountDemandedDollars.optional().empty("").allow(""),
    comercialValueSoles: comercialValueSoles.optional().empty("").allow(""),
    comercialValueDollars: comercialValueDollars.optional().empty("").allow(""),
    amountAffectionSoles: amountAffectionSoles.optional().empty("").allow(""),
    amountAffectionDollars: amountAffectionDollars.optional().empty("").allow(""),
    cautionaryCode: cautionaryCode.optional().empty("").allow(""),
    errandCode: errandCode.optional().empty("").allow(""),
    judicialSedeId: judicialSedeId.optional().empty("").allow(""),
    judge: judge.optional().empty("").allow(""),
    demandDate: demandDate.optional().empty("").allow(""),
    customerUserId: customerUserId.required(),
    judicialCourtId: judicialCourtId.required(),
    judicialSubjectId: judicialSubjectId.required(),
    judicialProceduralWayId: judicialProceduralWayId.required(),
    customerHasBankId: customerHasBankId.required(),
    clientId: clientId.required(),
    cityId: cityId.required(),
    idJudicialCaseFileRelated: idJudicialCaseFileRelated
        .optional()
        .empty("")
        .allow(""),
    bankId: bankId.optional().empty("").allow(""),
    qrCode: qrCode.optional().empty("").allow(""),
    chbTransferred: chbTransferred.optional().empty("").allow(""),
    responsibleUserId: responsibleUserId.optional().empty("").allow(""),
    isScanValid: isScanValid.optional(),
    wasScanned: wasScanned.optional(),
});
const getRelatedProcessByCaseFileIdSchema = joi_1.default.object({
    caseFileId: caseFileId.required(),
});
const getJudicialCaseFileRelatedProcesByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getJudicialCaseFileRelatedProcesByCHBSchema = joi_1.default.object({
    chb: chb.required(),
});
const getJudicialCaseFileRelatedProcesByCHBSchemaQuery = joi_1.default.object({
    page,
    limit,
    filter,
    courts,
    proceduralWays,
    subjects,
    users,
}).options({ abortEarly: true });
const getJudicialCaseFileRelatedProcesByCaseFileId = joi_1.default.object({
    page,
    limit,
    filter,
    courts,
    proceduralWays,
    subjects,
    users,
    responsibles
}).options({ abortEarly: true });
const getJudicialCaseFileRelatedProcesByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialCaseFileRelatedProcesByNumberCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    chb: customerHasBankId.required(),
});
const createQrCodeRelatedProcessSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    chb: customerHasBankId.required(),
});
const getJudicialCaseFileRelatedProcesByCustomerIdSchema = joi_1.default.object({
    customerId: customerId.required(),
});
exports.default = {
    getRelatedProcessByCaseFileIdSchema,
    createJudicialCaseFileRelatedProcessSchema,
    updateJudicialCaseFileRelatedProcessSchema,
    getJudicialCaseFileRelatedProcesByClientIDSchema,
    getJudicialCaseFileRelatedProcesByCHBSchema,
    getJudicialCaseFileRelatedProcesByCHBSchemaQuery,
    getJudicialCaseFileRelatedProcesByIDSchema,
    getJudicialCaseFileRelatedProcesByNumberCaseFileSchema,
    getJudicialCaseFileRelatedProcesByCaseFileId,
    getJudicialCaseFileRelatedProcesByCustomerIdSchema,
    createQrCodeRelatedProcessSchema,
};
