import Joi from "joi";
import { JudicialBinProceduralStageType } from "../types/judicial-bin-procedural-stage.type";

const id = Joi.number();
const typeBinnacle = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialBinProceduralStageSchema = Joi.object<
  Omit<
    JudicialBinProceduralStageType,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  proceduralStage: typeBinnacle.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialBinProceduralStageSchema = Joi.object<
  Omit<
    JudicialBinProceduralStageType,
    "id" | "customerHasBankId" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  proceduralStage: typeBinnacle.required(),
});

const getJudicialBinProceduralStageByIDSchema = Joi.object<
  { id: number },
  true
>({
  id: id.required(),
});

const getJudicialBinProceduralStageByCHBSchema = Joi.object<
  { chb: number },
  true
>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialBinProceduralStageSchema,
  updateJudicialBinProceduralStageSchema,
  getJudicialBinProceduralStageByCHBSchema,
  getJudicialBinProceduralStageByIDSchema,
};
