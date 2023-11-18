import Joi from "joi";
import { JudicialCaseFileType } from "../types/judicial-case-file.type";

const id = Joi.number();
const numberCaseFile = Joi.string().max(150);
const judgmentNumber = Joi.number();
const secretary = Joi.string().max(150);
const amountDemandedSoles = Joi.number().positive();
const amountDemandedDollars = Joi.number().positive();
const cautionaryCode = Joi.string().max(150);
const errandCode = Joi.string().max(150);
const judicialVenue = Joi.string().max(150);
const judge = Joi.string().max(150);
const demandDate = Joi.date();
const clientId = Joi.number();
const customerUserId = Joi.number();
const judicialCourtId = Joi.number().positive();
const judicialSubjectId = Joi.number().positive();
const judicialProceduralWayId = Joi.number().positive();
const customerHasBankId = Joi.number().positive();

const createJudicialCaseFileSchema = Joi.object<
  Omit<JudicialCaseFileType, "id" | "createdAt">,
  true
>({
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

const updateJudicialCaseFileSchema = Joi.object<
  Omit<JudicialCaseFileType, "id" | "clientId" | "createdAt">,
  true
>({
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

const getJudicialCaseFileByClientIDSchema = Joi.object<
  { clientId: number },
  true
>({
  clientId: clientId.required(),
});

const getJudicialCaseFileByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialCaseFileByNumberCaseFileSchema = Joi.object<
  { numberCaseFile: string },
  true
>({
  numberCaseFile: numberCaseFile.required(),
});

export default {
  createJudicialCaseFileSchema,
  updateJudicialCaseFileSchema,
  getJudicialCaseFileByClientIDSchema,
  getJudicialCaseFileByNumberCaseFileSchema,
  getJudicialCaseFileByIDSchema,
};
