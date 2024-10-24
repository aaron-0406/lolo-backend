"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const typeOfLoadId = joi_1.default.number().positive().messages({
    "number.base": `El campo 'Tipo de carga' no es válido`,
    "number.empty": `El campo 'Tipo de carga' no puede estar vacío`,
});
const judicialCollateralIdJudicialCollateral = joi_1.default.number();
const amountOfImpactSoles = joi_1.default.number();
const amountOfImpactDollars = joi_1.default.number();
const descriptionOfLoad = joi_1.default.string().messages({
    "string.empty": `El campo 'Descripción del cargo' no puede estar vacío`,
});
const registrationSeat = joi_1.default.string().messages({
    "string.empty": `El campo 'Asiento de registro' no puede estar vacío`,
});
const registrationDate = joi_1.default.date().messages({
    "date.base": `El campo 'Fecha de registro' debe ser una fecha válida`,
    "date.empty": `El campo 'Fecha de registro' no puede estar vacío`,
});
const appraisalDate = joi_1.default.date().messages({
    "date.base": `El campo 'Fecha de tasación' debe ser una fecha válida`,
    "date.empty": `El campo 'Fecha de tasación' no puede estar vacío`,
});
const range = joi_1.default.number().messages({
    "number.base": `El campo 'Rango' debe ser un número`,
    "number.empty": `El campo 'Rango' no puede estar vacío`,
});
const chb = joi_1.default.number();
const createJudicialCollateralChargesEncumbrancesSchema = joi_1.default.object({
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
const upadteJudicialCollateralChargesEncumbrancesSchema = joi_1.default.object({
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
const getJudicialCollateralChargesEncumbrancesByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialCollateralChargesEncumbrancesByCHBSchema = joi_1.default.object({
    chb: chb.required(),
});
const getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema = joi_1.default.object({
    collateralId: judicialCollateralIdJudicialCollateral.required(),
});
exports.default = {
    createJudicialCollateralChargesEncumbrancesSchema,
    upadteJudicialCollateralChargesEncumbrancesSchema,
    getJudicialCollateralChargesEncumbrancesByIDSchema,
    getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema,
    getJudicialCollateralChargesEncumbrancesByCHBSchema,
};
