"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const judicialObservationId = joi_1.default.number();
const awsName = joi_1.default.string();
const originalName = joi_1.default.string();
const customerHasBankId = joi_1.default.number();
const idCustomer = joi_1.default.number();
const chb = joi_1.default.number();
const judicialFileCaseId = joi_1.default.number();
const code = joi_1.default.string();
const createJudicialObsFileSchema = joi_1.default.object({
    awsName: awsName.required(),
    originalName: originalName.required(),
    customerHasBankId: customerHasBankId.required(),
    judicialObservationId: judicialObservationId.required(),
});
const updateJudicialObsFileSchema = joi_1.default.object({
    awsName: awsName.required(),
    originalName: originalName.required(),
});
const getFileSchema = joi_1.default.object({
    idCustomer,
    chb,
    code,
    id,
    judicialFileCaseId,
});
const getJudicialObsFileByIDSchema = joi_1.default.object({
    id: id.required(),
    chb,
    code,
    idCustomer,
    judicialFileCaseId,
});
const getJudicialObsFileByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
exports.default = {
    getFileSchema,
    createJudicialObsFileSchema,
    updateJudicialObsFileSchema,
    getJudicialObsFileByCHBSchema,
    getJudicialObsFileByIDSchema,
};
