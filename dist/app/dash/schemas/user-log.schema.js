"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const customerId = joi_1.default.number();
const getUserLogsByCustomerIdchema = joi_1.default.object({
    customerId: customerId.required(),
});
exports.default = {
    getUserLogsByCustomerIdchema,
};
