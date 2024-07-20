import Joi from "joi";
import { JudicialCaseFileType } from "../types/judicial-case-file.type";
import { JudicialCasefileProcessStatus } from "../types/judicial-case-file-process-status.type";

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
const processStatus = Joi.string().max(150);
const processComment = Joi.string();
const processReasonId = Joi.number().positive();
const bankId = Joi.number();
const idJudicialCaseFileRelated = Joi.number();
const qrCode = Joi.string();
const impulseStatus = Joi.number();
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
const sedes = Joi.string().required();
const impulse = Joi.string().required();
const sortBy = Joi.string().optional().empty("").allow("");
const order = Joi.string().optional().empty("").allow("");

const customerId = Joi.number();

const createJudicialCaseFileSchema = Joi.object<
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
  impulseStatus: impulseStatus.optional().empty("").allow(""),
});

const updateJudicialCaseFileSchema = Joi.object<
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
  impulseStatus: impulseStatus.optional().empty("").allow(""),
});

const updateJudicialCaseFileProcessStatusSchema = Joi.object<
  JudicialCasefileProcessStatus,
  true
>({
  processStatus: processStatus.optional().empty("").allow(""),
  processComment: processComment.optional().empty("").allow(""),
  processReasonId: processReasonId.optional().empty("").allow(""),
});

const getJudicialCaseFileByClientIDSchema = Joi.object<
  { clientId: number },
  true
>({
  clientId: clientId.required(),
});

const getJudicialCaseFileByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: chb.required(),
});

const getJudicialCaseFileByCHBSchemaQuery = Joi.object({
  page,
  limit,
  filter,
  courts,
  proceduralWays,
  subjects,
  users,
  sedes,
  impulse,
  sortBy,
  order,
}).options({ abortEarly: true });

const getJudicialCaseFileByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialCaseFileByNumberCaseFileSchema = Joi.object<
  { numberCaseFile: string; chb: number },
  true
>({
  numberCaseFile: numberCaseFile.required(),
  chb: customerHasBankId.required(),
});

const createQrCodeSchema = Joi.object<
  { numberCaseFile: string; chb: number },
  true
>({
  numberCaseFile: numberCaseFile.required(),
  chb: customerHasBankId.required(),
});

const getJudicialCaseFileByCustomerIdSchema = Joi.object<
  { customerId: number },
  true
>({
  customerId: customerId.required(),
});

export default {
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
