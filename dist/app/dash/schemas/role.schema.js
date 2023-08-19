"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const customerId = joi_1.default.number();
const name = joi_1.default.string().min(1).max(100);
const permissions = joi_1.default.array().items(joi_1.default.number().positive());
const createRoleSchema = joi_1.default.object({
    name: name.required(),
    customerId: customerId.required(),
    permissions: permissions.required(),
});
const getRoleByIdSchema = joi_1.default.object({
    id: id.required(),
});
const getAllRoleByCustomerIdSchema = joi_1.default.object({
    customerId: id.required(),
});
const updateRoleSchema = joi_1.default.object({
    name: name,
    permissions,
});
exports.default = {
    getAllRoleByCustomerIdSchema,
    createRoleSchema,
    updateRoleSchema,
    getRoleByIdSchema,
};
