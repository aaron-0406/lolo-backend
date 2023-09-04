import Joi from "joi";
import { JudicialProceduralWayType } from "../types/judicial-procedural-way.type";

const id = Joi.number();
const proceduralWay = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialProceduralWaySchema = Joi.object<
  Omit<JudicialProceduralWayType, "id">,
  true
>({
  proceduralWay: proceduralWay.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialProceduralWaySchema = Joi.object<
  Omit<JudicialProceduralWayType, "id" | "customerHasBankId">,
  true
>({
  proceduralWay: proceduralWay.required(),
});

const getJudicialProceduralWayByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialProcedurakWayByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  getJudicialProcedurakWayByCHBSchema,
  createJudicialProceduralWaySchema,
  updateJudicialProceduralWaySchema,
  getJudicialProceduralWayByIDSchema,
};
