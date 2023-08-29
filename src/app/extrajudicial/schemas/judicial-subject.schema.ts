import Joi from "joi";
import { JudicialSubjectType } from "../types/judicial-subject.type";

const id = Joi.number();
const subject = Joi.string().min(1).max(150);

const createJudicialSubjectSchema = Joi.object<
  Omit<JudicialSubjectType, "id">,
  true
>({
  subject,
});

const updateJudicialSubjectSchema = Joi.object<
  Omit<JudicialSubjectType, "id">,
  true
>({
  subject: subject.required(),
});

const getJudicialSubjectByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createJudicialSubjectSchema,
  updateJudicialSubjectSchema,
  getJudicialSubjectByIDSchema,
};
