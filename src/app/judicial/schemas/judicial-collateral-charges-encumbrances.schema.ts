import Joi from "joi";
import { JudicialCollateralChargesEncumbrancesType } from '../types/judicial-collateral-charges-encumbrances.type';

const id = Joi.number();
const idTypeOfLoad = Joi.number();
const judicialCollateralIdJudicialCollateral = Joi.number();
const amountOfImpactSoles = Joi.number();
const amountOfImpactDollars = Joi.number();
const descriptionOfLoad = Joi.string();
const registrationSeat = Joi.string();
const registrationDate = Joi.date();
const range = Joi.number();

const createJudicialCollateralChargesEncumbrancesSchema = Joi.object<
  Omit<JudicialCollateralChargesEncumbrancesType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  idTypeOfLoad: idTypeOfLoad.required(),
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  amountOfImpactSoles: amountOfImpactSoles.required(),
  amountOfImpactDollars: amountOfImpactDollars.required(),
  descriptionOfLoad: descriptionOfLoad.required(),
  registrationSeat: registrationSeat.required(),
  registrationDate: registrationDate.required(),
  range: range.required(),
});

const upadteJudicialCollateralChargesEncumbrancesSchema = Joi.object<
  Omit<JudicialCollateralChargesEncumbrancesType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  idTypeOfLoad: idTypeOfLoad.required(),
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  amountOfImpactSoles: amountOfImpactSoles.required(),
  amountOfImpactDollars: amountOfImpactDollars.required(),
  descriptionOfLoad: descriptionOfLoad.required(),
  registrationSeat: registrationSeat.required(),
  registrationDate: registrationDate.required(),
  range: range.required(),
});

const getJudicialCollateralChargesEncumbrancesByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema = Joi.object<{ judicialCollateralId: number }, true>({
  judicialCollateralId: judicialCollateralIdJudicialCollateral.required(),
});

export default {
  createJudicialCollateralChargesEncumbrancesSchema,
  upadteJudicialCollateralChargesEncumbrancesSchema,
  getJudicialCollateralChargesEncumbrancesByIDSchema,
  getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema,
}