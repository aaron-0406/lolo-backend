import Joi from "joi";
import { JudicialCourtType } from "../types/judicial-court.type";

const id = Joi.number();
const court = Joi.string().min(1).max(150);

const createJudicialCourtSchema = Joi.object<
  Omit<JudicialCourtType, "id">,
  true
>({
  court,
});

const updateJudicialCourtSchema = Joi.object<
  Omit<JudicialCourtType, "id">,
  true
>({
  court: court.required(),
});


const getJudicialCourtByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createJudicialCourtSchema,
  updateJudicialCourtSchema,
  getJudicialCourtByIDSchema,
};
