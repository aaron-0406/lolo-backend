"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = exports.getProductsByCustomerIdSchema = exports.getProductByCodeSchema = exports.removeJudicialCaseFileFromProductSchema = exports.assignJudicialCaseFileToProductsSchema = exports.getProductsByJudicialCaseFileIdSchema = exports.getProductByIdSchema = exports.getProductsByClientCodeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const code = joi_1.default.string();
const state = joi_1.default.string();
const customerId = joi_1.default.number();
const negotiationId = joi_1.default.number();
const clientId = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const extProductNameId = joi_1.default.number();
const judicialCaseFileId = joi_1.default.number();
const productIds = joi_1.default.string();
//INFO: CLIENTS SECTION
exports.getProductsByClientCodeSchema = joi_1.default.object({
    clientId: clientId.required(),
});
exports.getProductByIdSchema = joi_1.default.object({
    id: id.required(),
});
//INFO: JUDICIAL - CASE FILE SECTION
exports.getProductsByJudicialCaseFileIdSchema = joi_1.default.object({
    judicialCaseFileId: judicialCaseFileId.required(),
});
exports.assignJudicialCaseFileToProductsSchema = joi_1.default.object({
    productIds: productIds.required(),
    judicialCaseFileId: judicialCaseFileId.required(),
});
exports.removeJudicialCaseFileFromProductSchema = joi_1.default.object({
    productRemovedId: id.required(),
    judicialCaseFileId: judicialCaseFileId.required(),
});
//INFO: DASHBOARD SECTION
exports.getProductByCodeSchema = joi_1.default.object({
    code: code.required(),
});
exports.getProductsByCustomerIdSchema = joi_1.default.object({
    customerId: customerId.required(),
});
exports.createProductSchema = joi_1.default.object({
    code: code.required(),
    state: state.required(),
    customerId: customerId.required(),
    negotiationId: negotiationId.required(),
    clientId: clientId.required(),
    customerHasBankId: customerHasBankId.required(),
    extProductNameId: extProductNameId.optional(),
    judicialCaseFileId: judicialCaseFileId.optional(),
});
exports.updateProductSchema = joi_1.default.object({
    code: code.required(),
    state: state.required(),
    negotiationId: negotiationId.required(),
    extProductNameId: extProductNameId.optional(),
    customerHasBankId: customerHasBankId.required(),
    judicialCaseFileId: judicialCaseFileId.optional(),
});
