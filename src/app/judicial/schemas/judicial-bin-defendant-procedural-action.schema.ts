import Joi from "joi";
import { JudicialBinDefendantProceduralActionType } from "../types/judicial-bin-defendant-procedural-action.type";

const id = Joi.number();
const defendantProceduralAction = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialBinDefendantProceduralActionSchema = Joi.object<
  Omit<
    JudicialBinDefendantProceduralActionType,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  defendantProceduralAction: defendantProceduralAction.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialBinDefendantProceduralActionSchema = Joi.object<
  Omit<
    JudicialBinDefendantProceduralActionType,
    "id" | "customerHasBankId" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  defendantProceduralAction: defendantProceduralAction.required(),
});

const getJudicialBinDefendantProceduralActionByIDSchema = Joi.object<
  { id: number },
  true
>({
  id: id.required(),
});

const getJudicialBinDefendantProceduralActionByCHBSchema = Joi.object<
  { chb: number },
  true
>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialBinDefendantProceduralActionSchema,
  updateJudicialBinDefendantProceduralActionSchema,
  getJudicialBinDefendantProceduralActionByCHBSchema,
  getJudicialBinDefendantProceduralActionByIDSchema,
};
