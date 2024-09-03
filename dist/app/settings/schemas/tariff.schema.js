"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const customerHasBankId = joi_1.default.number();
const id = joi_1.default.number();
const getTariffsSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getTariffSchemaById = joi_1.default.object({
    id: id.required().messages({
        "number.base": "El campo id es inválido",
        "number.empty": "El campo id no puede estar vacío",
        "any.required": "El campo id es requerido.",
    }),
});
const createTariffSchema = joi_1.default.object({
    code: joi_1.default.string().required().messages({
        "string.base": "El campo código es inválido",
        "string.empty": "El campo código no puede estar vacío",
        "any.required": "El campo códigocode es requerido.",
    }),
    type: joi_1.default.string().required().messages({
        "string.base": "El campo tipo es inválido",
        "string.empty": "El campo tipo no puede estar vacío",
        "any.required": "El campo tipo es requerido.",
    }),
    description: joi_1.default.string().required().messages({
        "string.base": "El campo descripción es inválido",
        "string.empty": "El campo descripción no puede estar vacío",
        "any.required": "El campo descripción es requerido.",
    }),
    customerHasBankId: customerHasBankId.required(),
    value: joi_1.default.number().required().messages({
        "number.base": "El campo costo es inválido",
        "any.required": "El campo costo es requerido.",
    }),
});
const updateTariffSchema = joi_1.default.object({
    code: joi_1.default.string().required().messages({
        "string.base": "El campo código es inválido",
        "string.empty": "El campo código no puede estar vacío",
        "any.required": "El campo códigocode es requerido.",
    }),
    type: joi_1.default.string().required().messages({
        "string.base": "El campo tipo es inválido",
        "string.empty": "El campo tipo no puede estar vacío",
        "any.required": "El campo tipo es requerido.",
    }),
    description: joi_1.default.string().required().messages({
        "string.base": "El campo descripción es inválido",
        "string.empty": "El campo descripción no puede estar vacío",
        "any.required": "El campo descripción es requerido.",
    }),
    customerHasBankId: customerHasBankId.required(),
    value: joi_1.default.number().required().messages({
        "number.base": "El campo costo es inválido",
        "any.required": "El campo costo es requerido.",
    }),
});
const deleteTariffSchema = joi_1.default.object({
    id: id.required().messages({
        "number.base": "El campo id es inválido",
        "number.empty": "El campo id no puede estar vacío",
        "any.required": "El campo id es requerido.",
    }),
});
exports.default = {
    getTariffsSchema,
    createTariffSchema,
    updateTariffSchema,
    deleteTariffSchema,
};
