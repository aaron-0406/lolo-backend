"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const customerHasBankId = joi_1.default.number().positive().messages({
    "number.base": "The value '{{value}}' is not a valid number",
    "number.min": "The value '{{value}}' is not allowed to be lower than 0",
    "any.required": "The value is required",
});
const judicialCollateralIdJudicialCollateral = joi_1.default.number()
    .positive()
    .messages({
    "number.base": "El valor '{{value}}' no es un número válido",
    "number.min": "El valor '{{value}}' no puede ser menor que 0",
    "any.required": "El valor es requerido",
});
const appraisalDate = joi_1.default.date();
const expertReportDate = joi_1.default.date();
const encumbranceAmountSoles = joi_1.default.number();
const encumbranceAmountDollars = joi_1.default.number();
const conventionalValueSoles = joi_1.default.number();
const conventionalValueDollars = joi_1.default.number();
const marketValueSoles = joi_1.default.number();
const marketValueDollars = joi_1.default.number();
const realizationValueSoles = joi_1.default.number();
const realizationValueDollars = joi_1.default.number();
const auctionValueSoles = joi_1.default.number();
const auctionValueDollars = joi_1.default.number();
const auctionRound = joi_1.default.number();
const firstCallSoles = joi_1.default.number();
const firstCallDollars = joi_1.default.number();
const secondCallSoles = joi_1.default.number();
const secondCallDollars = joi_1.default.number();
const thirdCallSoles = joi_1.default.number();
const thirdCallDollars = joi_1.default.number();
const appraisalExperts = joi_1.default.string().messages({
    "string.base": "El valor '{{value}}' no es una cadena de texto válida",
    "string.empty": "El valor no puede estar vacío",
    "any.required": "El valor es requerido",
});
const auctionType = joi_1.default.string().messages({
    "string.base": "El valor '{{value}}' no es una cadena de texto válida",
    "string.empty": "El valor no puede estar vacío",
    "any.required": "El valor es requerido",
});
const auctionerName = joi_1.default.string().messages({
    "string.base": "El valor '{{value}}' no es una cadena de texto válida",
    "string.empty": "El valor no puede estar vacío",
    "any.required": "El valor es requerido",
});
const createJudicialCollateralAuctionRoundSchema = joi_1.default.object({
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
const updateJudicialCollateralAuctionRoundSchema = joi_1.default.object({
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
const deleteJudicialCollateralAuctionRoundSchema = joi_1.default.object({
    id: id.required(),
    chb: customerHasBankId.required(),
    collateralId: id.required(),
});
const getJudicialCollateralAuctionRoundByIdSchema = joi_1.default.object({
    id: id.required(),
    chb: customerHasBankId.required(),
    collateralId: judicialCollateralIdJudicialCollateral.required(),
});
exports.default = {
    createJudicialCollateralAuctionRoundSchema,
    updateJudicialCollateralAuctionRoundSchema,
    deleteJudicialCollateralAuctionRoundSchema,
    getJudicialCollateralAuctionRoundByIdSchema,
};
