"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const typeOfLoadId = joi_1.default.number();
const judicialCollateralIdJudicialCollateral = joi_1.default.number();
const amountOfImpactSoles = joi_1.default.number();
const amountOfImpactDollars = joi_1.default.number();
const descriptionOfLoad = joi_1.default.string().messages({
    "string.empty": `El campo 'Descripción del cargo' no puede estar vacío`,
});
const registrationSeat = joi_1.default.string().messages({
    "string.empty": `El campo 'Asiento de registro' no puede estar vacío`,
});
const registrationDate = joi_1.default.date();
const range = joi_1.default.number();
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
