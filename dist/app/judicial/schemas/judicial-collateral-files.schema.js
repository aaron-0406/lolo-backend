"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const nameOriginAws = joi_1.default.string();
const originalName = joi_1.default.string();
const judicialCollateralIdJudicialCollateral = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const idCustomer = joi_1.default.number();
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
exports.default = {
    getJudicialCollateralFilesByIDSchema,
    getJudicialCollateralFilesByJudicialCollateralIdSchema,
    createJudicialCollateralFilesParamSchema,
    getCollateralFileByIDSchema
};
