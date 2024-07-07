"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const nameOriginAws = joi_1.default.string();
const originalName = joi_1.default.string();
const judicialCollateralIdJudicialCollateral = joi_1.default.string();
const customerHasBankIdCustomerHasBank = joi_1.default.string();
const createJudicialCollateralFilesSchema = joi_1.default.object({
    nameOriginAws: nameOriginAws.required(),
    originalName: originalName.required(),
    judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
    customerHasBankIdCustomerHasBank: customerHasBankIdCustomerHasBank.required(),
});
const updateJudicialCollateralFilesSchema = joi_1.default.object({
    nameOriginAws: nameOriginAws.required(),
    originalName: originalName.required(),
    judicialCollateralIdJudicialCollateral: judicialCollateralIdJudicialCollateral.required(),
    customerHasBankIdCustomerHasBank: customerHasBankIdCustomerHasBank.required(),
});
const getJudicialCollateralFilesByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialCollateralFilesByJudicialCollateralIdSchema = joi_1.default.object({
    judicialCollateralId: judicialCollateralIdJudicialCollateral.required(),
});
exports.default = {
    createJudicialCollateralFilesSchema,
    updateJudicialCollateralFilesSchema,
    getJudicialCollateralFilesByIDSchema,
    getJudicialCollateralFilesByJudicialCollateralIdSchema,
};
