"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(1).max(150);
const customerHasBankId = joi_1.default.number();
const createJudicialRegistrationAreaSchema = joi_1.default.object({
    name: name.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateJudicialRegistrationAreaSchema = joi_1.default.object({
    name: name.required(),
    customerHasBankId: customerHasBankId.required(),
});
const getJudicialRegistrationAreaByIDSchema = joi_1.default.object({
    id: id.required(),
});
const getJudicialRegistrationAreaByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
exports.default = {
    createJudicialRegistrationAreaSchema,
    updateJudicialRegistrationAreaSchema,
    getJudicialRegistrationAreaByCHBSchema,
    getJudicialRegistrationAreaByIDSchema,
};
