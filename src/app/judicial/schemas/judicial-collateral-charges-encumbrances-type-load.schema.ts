import Joi from "joi";
import { JudicialCollateralChargesEncumbrancesTypeLoadType } from "../types/judicial-collateral-charges-encumbrances-type-load.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const customerHasBankId = Joi.number();

const createJudicialCollateralChargesEncumbrancesTypeLoadSchema = Joi.object<
  Omit<JudicialCollateralChargesEncumbrancesTypeLoadType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const updateJudicialCollateralChargesEncumbrancesTypeLoadSchema = Joi.object<
  Omit<JudicialCollateralChargesEncumbrancesTypeLoadType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  name: name.required(),
  customerHasBankId: customerHasBankId.required(),
});

const getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialCollateralChargesEncumbrancesTypeLoadByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: customerHasBankId.required(),
});

export default {
  createJudicialCollateralChargesEncumbrancesTypeLoadSchema,
  updateJudicialCollateralChargesEncumbrancesTypeLoadSchema,
  getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema,
  getJudicialCollateralChargesEncumbrancesTypeLoadByCHBSchema,
};