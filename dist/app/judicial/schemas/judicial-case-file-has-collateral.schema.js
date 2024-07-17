"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const chb = joi_1.default.number();
const collateralId = joi_1.default.number();
const numberCaseFile = joi_1.default.string();
const getAllRelatedCaseFileAssociateToCollateralSchema = joi_1.default.object({
    chb: chb.required(),
    numberCaseFile: numberCaseFile.required(),
    collateralId: collateralId.required(),
});
const assingCollateralToCaseFileSchema = joi_1.default.object({
    newJudicialCasefileHasCollateral: joi_1.default.array().items(joi_1.default.object({
        judicialCollateralId: joi_1.default.number().required(),
        judicialCaseFileId: joi_1.default.number().required(),
    })).required(),
});
const getCaseFileHasCollateralByIdSchema = joi_1.default.object({
    collateralId: joi_1.default.number().required(),
});
exports.default = {
    getAllRelatedCaseFileAssociateToCollateralSchema,
    getCaseFileHasCollateralByIdSchema,
    assingCollateralToCaseFileSchema,
};
