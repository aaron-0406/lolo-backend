"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const codeAction = joi_1.default.string().min(1).max(10);
const nameAction = joi_1.default.string().min(1).max(150);
const codeSubTypeManagement = joi_1.default.string().min(1).max(10).optional().allow("");
const customerHasBankId = joi_1.default.number();
const createManagementActionSchema = joi_1.default.object({
    codeAction: codeAction.required(),
    nameAction: nameAction.required(),
    codeSubTypeManagement: codeSubTypeManagement.optional(),
    customerHasBankId: customerHasBankId.required(),
});
const updateManagementActionSchema = joi_1.default.object({
    codeAction: codeAction.required(),
    nameAction: nameAction.required(),
    codeSubTypeManagement: codeSubTypeManagement.optional(),
    customerHasBankId: customerHasBankId.required(),
});
const getManagementActionSchema = joi_1.default.object({
    id: id.required(),
});
const getManagementActionByCHBSchema = joi_1.default.object({
    chb: id.required(),
});
exports.default = {
    createManagementActionSchema,
    updateManagementActionSchema,
    getManagementActionSchema,
    getManagementActionByCHBSchema,
};
