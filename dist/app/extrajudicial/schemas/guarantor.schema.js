"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(1).max(150);
const phone = joi_1.default.string().max(150);
const email = joi_1.default.string().max(150);
const createdAt = joi_1.default.date();
const clientId = joi_1.default.number();
const createGuarantorSchema = joi_1.default.object({
    name: name.required(),
    phone: phone.optional().empty("").allow(""),
    email: email.optional().empty("").allow(""),
    createdAt: createdAt.optional(),
    clientId: clientId.required(),
});
const updateGuarantorSchema = joi_1.default.object({
    name: name.required(),
    phone: phone.optional().empty("").allow(""),
    email: email.optional().empty("").allow(""),
    createdAt: createdAt.optional(),
});
const getGuarantorByClientIDSchema = joi_1.default.object({
    clientId: clientId.required(),
});
const getGuarantorByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createGuarantorSchema,
    updateGuarantorSchema,
    getGuarantorByClientIDSchema,
    getGuarantorByIDSchema,
};
