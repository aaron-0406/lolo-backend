import Joi from "joi";
import { JudicialCollateralChargesEncumbrancesType } from '../types/judicial-collateral-charges-encumbrances.type';

const id = Joi.number();
const typeOfLoadId = Joi.number();
const judicialCollateralIdJudicialCollateral = Joi.number();
const amountOfImpactSoles = Joi.number();
const amountOfImpactDollars = Joi.number();
const descriptionOfLoad = Joi.string().messages({
  "string.empty": `El campo 'Descripción del cargo' no puede estar vacío`,
});
const registrationSeat = Joi.string().messages({
  "string.empty": `El campo 'Asiento de registro' no puede estar vacío`,
});
const registrationDate = Joi.date();
const appraisalDate = Joi.date();
const range = Joi.number();

const chb = Joi.number();

const createJudicialCollateralChargesEncumbrancesSchema = Joi.object<
  Omit<JudicialCollateralChargesEncumbrancesType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  typeOfLoadId: typeOfLoadId.required(),
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  amountOfImpactSoles: amountOfImpactSoles.required(),
  amountOfImpactDollars: amountOfImpactDollars.required(),
  descriptionOfLoad: descriptionOfLoad.required(),
  registrationSeat: registrationSeat.required(),
  registrationDate: registrationDate.required(),
  range: range.required(),
  appraisalDate: appraisalDate.required(),
});

const upadteJudicialCollateralChargesEncumbrancesSchema = Joi.object<
  Omit<JudicialCollateralChargesEncumbrancesType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  typeOfLoadId: typeOfLoadId.required(),
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  amountOfImpactSoles: amountOfImpactSoles.required(),
  amountOfImpactDollars: amountOfImpactDollars.required(),
  descriptionOfLoad: descriptionOfLoad.required(),
  registrationSeat: registrationSeat.required(),
  registrationDate: registrationDate.required(),
  range: range.required(),
  appraisalDate: appraisalDate.required(),
});

const getJudicialCollateralChargesEncumbrancesByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getJudicialCollateralChargesEncumbrancesByCHBSchema = Joi.object<{ chb: number }, true>({
  chb: chb.required(),
});

const getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema = Joi.object<{ collateralId: number }, true>({
  collateralId: judicialCollateralIdJudicialCollateral.required(),
});

export default {
  createJudicialCollateralChargesEncumbrancesSchema,
  upadteJudicialCollateralChargesEncumbrancesSchema,
  getJudicialCollateralChargesEncumbrancesByIDSchema,
  getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema,
  getJudicialCollateralChargesEncumbrancesByCHBSchema,
}