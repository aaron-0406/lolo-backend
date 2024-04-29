import Joi from "joi";
import { JudicialBinTypeBinnacleType } from "../types/judicial-bin-type-binnacle.type";

const id = Joi.number();
const typeBinnacle = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialBinTypeBinnacleSchema = Joi.object<
  Omit<
    JudicialBinTypeBinnacleType,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  typeBinnacle: typeBinnacle.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialBinTypeBinnacleSchema = Joi.object<
  Omit<
    JudicialBinTypeBinnacleType,
    "id" | "customerHasBankId" | "createdAt" | "updatedAt" | "deletedAt"
  >,
  true
>({
  typeBinnacle: typeBinnacle.required(),
});

const getJudicialBinTypeBinnacleByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialBinTypeBinnacleByCHBSchema = Joi.object<{ chb: number }, true>(
  {
    chb: customerHasBankId.required(),
  }
);

export default {
  createJudicialBinTypeBinnacleSchema,
  updateJudicialBinTypeBinnacleSchema,
  getJudicialBinTypeBinnacleByCHBSchema,
  getJudicialBinTypeBinnacleByIDSchema,
};
