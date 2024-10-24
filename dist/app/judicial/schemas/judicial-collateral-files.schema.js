"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const judicialCollateralIdJudicialCollateral = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const filter = joi_1.default.string().optional().messages({
    "string.base": "El campo filter es inválido",
    "any.required": "El campo filter es requerido.",
    "string.empty": "El campo filter no puede estar vácio",
});
const getJudicialCollateralFilesByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getCollateralFileByIDSchema = joi_1.default.object({
    id: id.required(),
    chb: customerHasBankId.required(),
    collateralId: judicialCollateralIdJudicialCollateral.required(),
});
const getJudicialCollateralFilesByJudicialCollateralIdSchema = joi_1.default.object({
    collateralId: judicialCollateralIdJudicialCollateral.required(),
    chb: customerHasBankId.required(),
});
const createJudicialCollateralFilesParamSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
    collateralId: judicialCollateralIdJudicialCollateral.required(),
});
const getJudicialCaseFileByCHBSchemaQuery = joi_1.default.object({
    filter,
}).options({ abortEarly: true });
exports.default = {
    getJudicialCollateralFilesByIDSchema,
    getJudicialCollateralFilesByJudicialCollateralIdSchema,
    createJudicialCollateralFilesParamSchema,
    getCollateralFileByIDSchema,
    getJudicialCaseFileByCHBSchemaQuery
};
