"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const judicialBinnacleId = joi_1.default.number();
const nameOriginAws = joi_1.default.string();
const originalName = joi_1.default.string();
const customerHasBankId = joi_1.default.number();
const idCustomer = joi_1.default.number();
const chb = joi_1.default.number();
const size = joi_1.default.number();
const judicialFileCaseId = joi_1.default.number();
const code = joi_1.default.string();
const createJudicialBinFileSchema = joi_1.default.object({
    nameOriginAws: nameOriginAws.required(),
    originalName: originalName.required(),
    customerHasBankId: customerHasBankId.required(),
    judicialBinnacleId: judicialBinnacleId.required(),
    size: size.required(),
});
const updateJudicialBinFileSchema = joi_1.default.object({
    nameOriginAws: nameOriginAws.required(),
    originalName: originalName.required(),
    size: size.required(),
});
const getFileSchema = joi_1.default.object({
    idCustomer,
    chb,
    code,
    id,
    judicialFileCaseId,
});
const getJudicialBinFileByIDSchema = joi_1.default.object({
    id: id.required(),
    chb,
    code,
    idCustomer,
    judicialFileCaseId,
});
const getJudicialBinFileByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
exports.default = {
    getFileSchema,
    createJudicialBinFileSchema,
    updateJudicialBinFileSchema,
    getJudicialBinFileByCHBSchema,
    getJudicialBinFileByIDSchema,
};
