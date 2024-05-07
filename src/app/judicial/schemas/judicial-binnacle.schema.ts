import Joi from "joi";
import { JudicialBinnacleType } from "../types/judicial-binnacle.type";

const id = Joi.number();
const lastPerformed = Joi.string();
const judicialBinProceduralStageId = Joi.number();
const judicialDefendantProceduralActionId = Joi.number();
const customerHasBankId = Joi.number();
const binnacleTypeId = Joi.number();
const judicialFileCaseId = Joi.number();
const date = Joi.date();

const createJudicialBinnacleSchema = Joi.object<
  Omit<JudicialBinnacleType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  binnacleTypeId: binnacleTypeId.required(),
  judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
  customerHasBankId: customerHasBankId.required(),
  lastPerformed: lastPerformed.required(),
  date: date.required(),
  judicialFileCaseId: judicialFileCaseId.required(),
  judicialDefendantProceduralActionId:
    judicialDefendantProceduralActionId.required(),
});

const updateJudicialBinnacleSchema = Joi.object<
  Omit<
    JudicialBinnacleType,
    | "id"
    | "customerHasBankId"
    | "judicialFileCaseId"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  >,
  true
>({
  lastPerformed: lastPerformed.required(),
  judicialBinProceduralStageId: judicialBinProceduralStageId.required(),
  binnacleTypeId: binnacleTypeId.required(),
  judicialDefendantProceduralActionId:
    judicialDefendantProceduralActionId.required(),
  date: date.required(),
});

const getJudicialBinnacleByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const createJudicialBinnacleParamSchema = Joi.object<
  { code: string; idCustomer: number },
  true
>({
  code: Joi.string().required(),
  idCustomer: Joi.number().required(),
});
const updateJudicialBinnacleParamSchema = Joi.object<
  { id: number; code: string; idCustomer: number },
  true
>({
  id: id.required(),
  code: Joi.string().required(),
  idCustomer: Joi.number().required(),
});

const getJudicialBinnacleByCHBSchema = Joi.object<{ fileCase: number }, true>({
  fileCase: Joi.number().required(),
});

export default {
  createJudicialBinnacleSchema,
  updateJudicialBinnacleSchema,
  getJudicialBinnacleByCHBSchema,
  getJudicialBinnacleByIDSchema,
  createJudicialBinnacleParamSchema,
  updateJudicialBinnacleParamSchema,
};
