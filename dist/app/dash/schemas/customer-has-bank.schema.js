"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const idCustomer = joi_1.default.number();
const idBank = joi_1.default.number();
const createAt = joi_1.default.date();
const createCustomerHasBankSchema = joi_1.default.object({
    idCustomer: idCustomer.required(),
    idBank: idBank.required(),
    createdAt: createAt.optional(),
});
const getCustomerSchema = joi_1.default.object({
    idCustomer: idCustomer.required(),
});
const getCustomerHasBankSchema = joi_1.default.object({
    idCustomer: idCustomer.required(),
    idBank: idBank.required(),
});
exports.default = {
    createCustomerHasBankSchema,
    getCustomerHasBankSchema,
    getCustomerSchema,
};
