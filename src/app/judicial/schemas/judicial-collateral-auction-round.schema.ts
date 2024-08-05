import Joi from "joi";
import { JudicialCollateralAuctionRoundType } from "../types/judicial-collateral-auction-round.type";

const id = Joi.number();
const caseFileId = Joi.number();
const customerHasBankId = Joi.number().positive().messages({
  "number.base": "The value '{{value}}' is not a valid number",
  "number.min": "The value '{{value}}' is not allowed to be lower than 0",
  "any.required": "The value is required",
});
const judicialCollateralIdJudicialCollateral = Joi.number()
  .positive()
  .messages({
    "number.base": "El valor '{{value}}' no es un número válido",
    "number.min": "El valor '{{value}}' no puede ser menor que 0",
    "any.required": "El valor es requerido",
  });
const appraisalDate = Joi.date();
const expertReportDate = Joi.date();
const encumbranceAmountSoles = Joi.number();
const encumbranceAmountDollars = Joi.number();
const conventionalValueSoles = Joi.number();
const conventionalValueDollars = Joi.number();
const marketValueSoles = Joi.number();
const marketValueDollars = Joi.number();
const realizationValueSoles = Joi.number();
const realizationValueDollars = Joi.number();
const auctionValueSoles = Joi.number();
const auctionValueDollars = Joi.number();
const auctionRound = Joi.number();
const firstCallSoles = Joi.number();
const firstCallDollars = Joi.number();
const secondCallSoles = Joi.number();
const secondCallDollars = Joi.number();
const thirdCallSoles = Joi.number();
const thirdCallDollars = Joi.number();
const appraisalExperts = Joi.string().messages({
  "string.base": "El valor '{{value}}' no es una cadena de texto válida",
  "string.empty": "Peritos tasadores no pueden estar vacíos",
  "any.required": "El valor es requerido",
});
const auctionType = Joi.string().messages({
  "string.base": "El valor '{{value}}' no es una cadena de texto válida",
  "string.empty": "El tipo de colección no puede estar vacío",
  "any.required": "El valor es requerido",
});
const auctionerName = Joi.string().messages({
  "string.base": "El valor '{{value}}' no es una cadena de texto válida",
  "string.empty": "El nombre del martillero puede estar vacío",
  "any.required": "El valor es requerido",
});

const createJudicialCollateralAuctionRoundSchema = Joi.object<
  Omit< JudicialCollateralAuctionRoundType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  customerHasBankId: customerHasBankId.required(),
  appraisalDate: appraisalDate.optional().empty("").allow(""),
  expertReportDate: expertReportDate.optional().empty("").allow(""),
  encumbranceAmountSoles: encumbranceAmountSoles.optional(),
  encumbranceAmountDollars: encumbranceAmountDollars.optional(),
  conventionalValueSoles: conventionalValueSoles.optional(),
  conventionalValueDollars: conventionalValueDollars.optional(),
  marketValueSoles: marketValueSoles.optional(),
  marketValueDollars: marketValueDollars.optional(),
  realizationValueSoles: realizationValueSoles.optional(),
  realizationValueDollars: realizationValueDollars.optional(),
  auctionValueSoles: auctionValueSoles.optional(),
  auctionValueDollars: auctionValueDollars.optional(),
  auctionRound: auctionRound.optional(),
  firstCallSoles: firstCallSoles.optional(),
  firstCallDollars: firstCallDollars.optional(),
  secondCallSoles: secondCallSoles.optional(),
  secondCallDollars: secondCallDollars.optional(),
  thirdCallSoles: thirdCallSoles.optional(),
  thirdCallDollars: thirdCallDollars.optional(),
  appraisalExperts: appraisalExperts.required(),
  auctionType: auctionType.required(),
  auctionerName: auctionerName.required(),
});

const updateJudicialCollateralAuctionRoundSchema = Joi.object<
  Omit< JudicialCollateralAuctionRoundType, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  true
>({
  judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
  customerHasBankId: customerHasBankId.required(),
  appraisalDate: appraisalDate.optional().empty("").allow(""),
  expertReportDate: expertReportDate.optional().empty("").allow(""),
  encumbranceAmountSoles: encumbranceAmountSoles.optional(),
  encumbranceAmountDollars: encumbranceAmountDollars.optional(),
  conventionalValueSoles: conventionalValueSoles.optional(),
  conventionalValueDollars: conventionalValueDollars.optional(),
  marketValueSoles: marketValueSoles.optional(),
  marketValueDollars: marketValueDollars.optional(),
  realizationValueSoles: realizationValueSoles.optional(),
  realizationValueDollars: realizationValueDollars.optional(),
  auctionValueSoles: auctionValueSoles.optional(),
  auctionValueDollars: auctionValueDollars.optional(),
  auctionRound: auctionRound.optional(),
  firstCallSoles: firstCallSoles.optional(),
  firstCallDollars: firstCallDollars.optional(),
  secondCallSoles: secondCallSoles.optional(),
  secondCallDollars: secondCallDollars.optional(),
  thirdCallSoles: thirdCallSoles.optional(),
  thirdCallDollars: thirdCallDollars.optional(),
  appraisalExperts: appraisalExperts.required(),
  auctionType: auctionType.required(),
  auctionerName: auctionerName.required(),
});

const deleteJudicialCollateralAuctionRoundSchema = Joi.object<
  { id:number, collateralId: number; chb: number },
  true
>({
  id: id.required(),
  chb: customerHasBankId.required(),
  collateralId: id.required(),
});

const getJudicialCollateralAuctionRoundByIdSchema = Joi.object<
  { id: number; chb: number; collateralId: number },
  true
>({
  id: id.required(),
  chb: customerHasBankId.required(),
  collateralId: judicialCollateralIdJudicialCollateral.required(),
});

const getJudicialCollateralAuctionRoundByCaseFileIdSchema = Joi.object<
  { caseFileId: number },
  true
>({
  caseFileId: caseFileId.required(),
});

export default {
  createJudicialCollateralAuctionRoundSchema,
  updateJudicialCollateralAuctionRoundSchema,
  deleteJudicialCollateralAuctionRoundSchema,
  getJudicialCollateralAuctionRoundByIdSchema,
  getJudicialCollateralAuctionRoundByCaseFileIdSchema
};