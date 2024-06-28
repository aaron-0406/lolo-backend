"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const idTypeOfLoad = joi_1.default.number();
const judicialCollateralIdJudicialCollateral = joi_1.default.number();
const amountOfImpactSoles = joi_1.default.number();
const amountOfImpactDollars = joi_1.default.number();
const descriptionOfLoad = joi_1.default.string();
const registrationSeat = joi_1.default.string();
const registrationDate = joi_1.default.date();
const range = joi_1.default.number();
const createJudicialCollateralChargesEncumbrancesSchema = joi_1.default.object({
    idTypeOfLoad: idTypeOfLoad.required(),
    judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
    amountOfImpactSoles: amountOfImpactSoles.required(),
    amountOfImpactDollars: amountOfImpactDollars.required(),
    descriptionOfLoad: descriptionOfLoad.required(),
    registrationSeat: registrationSeat.required(),
    registrationDate: registrationDate.required(),
    range: range.required(),
});
const upadteJudicialCollateralChargesEncumbrancesSchema = joi_1.default.object({
    idTypeOfLoad: idTypeOfLoad.required(),
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
const getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema = joi_1.default.object({
    judicialCollateralId: judicialCollateralIdJudicialCollateral.required(),
});
exports.default = {
    createJudicialCollateralChargesEncumbrancesSchema,
    upadteJudicialCollateralChargesEncumbrancesSchema,
    getJudicialCollateralChargesEncumbrancesByIDSchema,
    getJudicialCollateralChargesEncumbrancesByJudicialCollateralIdSchema,
};
