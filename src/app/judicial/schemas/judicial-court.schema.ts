import Joi from "joi";
import { JudicialCourtType } from "../types/judicial-court.type";

const id = Joi.number();
const court = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialCourtSchema = Joi.object<
  Omit<JudicialCourtType, "id">,
  true
>({
  court: court.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialCourtSchema = Joi.object<
  Omit<JudicialCourtType, "id" | "customerHasBankId">,
  true
>({
  court: court.required(),
});

const getJudicialCourtByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialCourtByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialCourtSchema,
  updateJudicialCourtSchema,
  getJudicialCourtByCHBSchema,
  getJudicialCourtByIDSchema,
};
