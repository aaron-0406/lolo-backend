import Joi from "joi";
import { JudicialProcessReasonType } from "../types/judicial-process-reason.type";

const id = Joi.number();
const customerHasBankId = Joi.number();
const reason = Joi.string().min(1).max(150);

const createJudicialReasonProcessSchema = Joi.object<
  Omit<JudicialProcessReasonType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  reason: reason.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialReasonProcessSchema = Joi.object<
  Omit<
    JudicialProcessReasonType,
    "id" | "customerHasBankId" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  reason: reason.optional(),
});

const getJudicialReasonProcessByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialReasonProcessByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialReasonProcessSchema,
  updateJudicialReasonProcessSchema,
  getJudicialReasonProcessByIDSchema,
  getJudicialReasonProcessByCHBSchema,
};
