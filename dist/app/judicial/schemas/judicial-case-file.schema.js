"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const regexPatternNumberFileCase = /^\d{5}-\d{4}-\d{1,4}-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
const id = joi_1.default.number();
const numberCaseFile = joi_1.default.string().regex(regexPatternNumberFileCase).messages({
    "string.pattern.base": 'El formato del código no es válido. Debe seguir el patrón "####-####-####-####-LL-LL-##".',
});
const judgmentNumber = joi_1.default.number();
const secretary = joi_1.default.string().max(150);
const amountDemandedSoles = joi_1.default.number();
const amountDemandedDollars = joi_1.default.number();
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
const processStatus = joi_1.default.string().max(150);
const processComment = joi_1.default.string();
const processReasonId = joi_1.default.number().positive();
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
const sedes = joi_1.default.string().required();
const sortBy = joi_1.default.string().optional().empty("").allow("");
const order = joi_1.default.string().optional().empty("").allow("");
const customerId = joi_1.default.number();
const chbTransferred = joi_1.default.number();
const responsibleUserId = joi_1.default.number();
const isScanValid = joi_1.default.boolean();
const wasScanned = joi_1.default.boolean();
const createJudicialCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.optional().empty("").allow(""),
    secretary: secretary.optional().empty("").allow(""),
    amountDemandedSoles: amountDemandedSoles.optional().empty("").allow(""),
    amountDemandedDollars: amountDemandedDollars.optional().empty("").allow(""),
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
const updateJudicialCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    judgmentNumber: judgmentNumber.optional().empty("").allow(""),
    secretary: secretary.optional().empty("").allow(""),
    amountDemandedSoles: amountDemandedSoles.optional().empty("").allow(""),
    amountDemandedDollars: amountDemandedDollars.optional().empty("").allow(""),
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
const updateJudicialCaseFileProcessStatusSchema = joi_1.default.object({
    processStatus: processStatus.optional().empty("").allow(""),
    processComment: processComment.optional().empty("").allow(""),
    processReasonId: processReasonId.optional().empty("").allow(""),
});
const getJudicialCaseFileByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getJudicialCaseFileByCHBSchema = joi_1.default.object({
    chb: chb.required(),
});
const getJudicialCaseFileByCHBSchemaQuery = joi_1.default.object({
    page,
    limit,
    filter,
    courts,
    proceduralWays,
    subjects,
    users,
    responsibles,
    sedes,
    sortBy,
    order,
}).options({ abortEarly: true });
const getJudicialCaseFileByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialCaseFileByNumberCaseFileSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    chb: customerHasBankId.required(),
});
const createQrCodeSchema = joi_1.default.object({
    numberCaseFile: numberCaseFile.required(),
    chb: customerHasBankId.required(),
});
const getJudicialCaseFileByCustomerIdSchema = joi_1.default.object({
    customerId: customerId.required(),
});
exports.default = {
    createJudicialCaseFileSchema,
    updateJudicialCaseFileSchema,
    updateJudicialCaseFileProcessStatusSchema,
    getJudicialCaseFileByClientIDSchema,
    getJudicialCaseFileByNumberCaseFileSchema,
    getJudicialCaseFileByIDSchema,
    getJudicialCaseFileByCHBSchema,
    getJudicialCaseFileByCHBSchemaQuery,
    getJudicialCaseFileByCustomerIdSchema,
    createQrCodeSchema,
};
