"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().max(200);
const createExtTagGroupSchema = joi_1.default.object({
    name: name.required(),
});
const updateExtTagGroupSchema = joi_1.default.object({
    name: name.required(),
});
const getExtTagGroupByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createExtTagGroupSchema,
    updateExtTagGroupSchema,
    getExtTagGroupByIDSchema,
};
