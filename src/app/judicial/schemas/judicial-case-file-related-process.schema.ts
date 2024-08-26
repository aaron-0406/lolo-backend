import Joi from "joi";
import { JudicialCaseFileType } from "../types/judicial-case-file.type";

const caseFileId = Joi.number().required();
const regexPatternNumberFileCase =
  /^\d{5}-\d{4}-\d{1,4}-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
const id = Joi.number();
const numberCaseFile = Joi.string().regex(regexPatternNumberFileCase).messages({
  "string.pattern.base":
    'El formato del código no es válido. Debe seguir el patrón "####-####-####-####-LL-LL-##".',
});
const judgmentNumber = Joi.number();
const secretary = Joi.string().max(150);
const amountDemandedSoles = Joi.number();
const amountDemandedDollars = Joi.number();
const cautionaryCode = Joi.string().max(150);
const errandCode = Joi.string().max(150);
const judicialSedeId = Joi.number().positive();
const judge = Joi.string().max(150);
const demandDate = Joi.date();
const clientId = Joi.number();
const cityId = Joi.number();
const chb = Joi.number();
const customerUserId = Joi.number();
const judicialCourtId = Joi.number().positive();
const judicialSubjectId = Joi.number().positive();
const judicialProceduralWayId = Joi.number().positive();
const customerHasBankId = Joi.number().positive();
const bankId = Joi.number();
const idJudicialCaseFileRelated = Joi.number();
const qrCode = Joi.string();

const page = Joi.number().required().messages({
  "number.base": "El campo page es inválido",
  "any.required": "El campo page es requerido.",
});

const limit = Joi.number().required().messages({
  "number.base": "El campo limit es inválido",
  "any.required": "El campo limit es requerido.",
});

const filter = Joi.string().optional().messages({
  "string.base": "El campo filter es inválido",
  "any.required": "El campo filter es requerido.",
  "string.empty": "El campo filter no puede estar vácio",
});

const courts = Joi.string().required();
const proceduralWays = Joi.string().required();
const subjects = Joi.string().required();
const users = Joi.string().required();
const responsibles = Joi.string().required();

const customerId = Joi.number();
const chbTransferred = Joi.number();
const responsibleUserId = Joi.number();

const isScanValid = Joi.boolean();
const wasScanned = Joi.boolean();

const createJudicialCaseFileRelatedProcessSchema = Joi.object<
  Omit<
    JudicialCaseFileType,
    "id" | "createdAt" | "processStatus" | "processComment" | "processReasonId"
  >,
  true
>({
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

const updateJudicialCaseFileRelatedProcessSchema = Joi.object<
  Omit<
    JudicialCaseFileType,
    "id" | "createdAt" | "processStatus" | "processComment" | "processReasonId"
  >,
  true
>({
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

const getRelatedProcessByCaseFileIdSchema = Joi.object<
  { caseFileId: number },
  true
>({
  caseFileId: caseFileId.required(),
});

const getJudicialCaseFileRelatedProcesByClientIDSchema = Joi.object<
  { clientId: number },
  true
>({
  clientId: clientId.required(),
});

const getJudicialCaseFileRelatedProcesByCHBSchema = Joi.object<
  { chb: number },
  true
>({
  chb: chb.required(),
});

const getJudicialCaseFileRelatedProcesByCHBSchemaQuery = Joi.object({
  page,
  limit,
  filter,
  courts,
  proceduralWays,
  subjects,
  users,
}).options({ abortEarly: true });

const getJudicialCaseFileRelatedProcesByCaseFileId = Joi.object({
  page,
  limit,
  filter,
  courts,
  proceduralWays,
  subjects,
  users,
  responsibles
}).options({ abortEarly: true });
const getJudicialCaseFileRelatedProcesByIDSchema = Joi.object<
  { id: number },
  true
>({
  id: id.required(),
});


const getJudicialCaseFileRelatedProcesByNumberCaseFileSchema = Joi.object<
  { numberCaseFile: string; chb: number },
  true
>({
  numberCaseFile: numberCaseFile.required(),
  chb: customerHasBankId.required(),
});

const createQrCodeRelatedProcessSchema = Joi.object<
  { numberCaseFile: string; chb: number },
  true
>({
  numberCaseFile: numberCaseFile.required(),
  chb: customerHasBankId.required(),
});

const getJudicialCaseFileRelatedProcesByCustomerIdSchema = Joi.object<
  { customerId: number },
  true
>({
  customerId: customerId.required(),
});

export default {
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
