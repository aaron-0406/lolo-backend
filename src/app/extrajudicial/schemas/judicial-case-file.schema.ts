import Joi from "joi";
import { JudicialCaseFileType } from "../types/judicial-case-file.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const phone = Joi.string().max(150);
const email = Joi.string().max(150);
const createdAt = Joi.date();
const clientId = Joi.number();

const numberCaseFile = Joi.number();
const judgmentNumber = Joi.number();
const secretary = Joi.string().max(150);
const amountDemandedSoles = Joi.number();
const cautionaryCode = Joi.string().max(150);
const errandCode = Joi.string().max(150);
const judicialVenue = Joi.string().max(150);
const judge = Joi.string().max(150);
const demandDate = Joi.date();
const judicialCourtId = Joi.number().positive();
const judicialSubjectId = Joi.number().positive();
const judicialProceduralWayId = Joi.number().positive();

const createJudicialCaseFileSchema = Joi.object<
  Omit<JudicialCaseFileType, "id">,
  true
>({
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

const updateJudicialCaseFileSchema = Joi.object<
  Omit<JudicialCaseFileType, "id" | "clientId">,
  true
>({
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

const getJudicialCaseFileByClientIDSchema = Joi.object<
  { clientId: number },
  true
>({
  clientId: clientId.required(),
});

const getJudicialCaseFileByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createJudicialCaseFileSchema,
  updateJudicialCaseFileSchema,
  getJudicialCaseFileByClientIDSchema,
  getJudicialCaseFileByIDSchema,
};
