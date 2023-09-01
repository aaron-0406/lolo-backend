import Joi from "joi";
import { JudicialSubjectType } from "../types/judicial-subject.type";

const id = Joi.number();
const customerHasBankId = Joi.number();
const subject = Joi.string().min(1).max(150);

const createJudicialSubjectSchema = Joi.object<
  Omit<JudicialSubjectType, "id">,
  true
>({
  subject: subject.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialSubjectSchema = Joi.object<
  Omit<JudicialSubjectType, "id" | "customerHasBankId">,
  true
>({
  subject: subject.optional(),
});

const getJudicialSubjectByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createJudicialSubjectSchema,
  updateJudicialSubjectSchema,
  getJudicialSubjectByIDSchema,
};
