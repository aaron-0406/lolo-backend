"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().max(200);
const color = joi_1.default.string().max(7);
const action = joi_1.default.boolean();
const tagGroupId = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const createExtTagSchema = joi_1.default.object({
    name: name.required(),
    color: color.required(),
    action: action.required(),
    tagGroupId: tagGroupId.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateExtTagSchema = joi_1.default.object({
    name: name.required(),
    color: color.required(),
    action: action.required(),
    tagGroupId: tagGroupId.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateExtTagActionSchema = joi_1.default.object({
    action: action.required(),
});
const getExtTagByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getExtTagByCHBAndTagGroupIdSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
    tagGroupId: tagGroupId.required(),
});
const getExtTagByIDSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createExtTagSchema,
    updateExtTagSchema,
    updateExtTagActionSchema,
    getExtTagByCHBSchema,
    getExtTagByCHBAndTagGroupIdSchema,
    getExtTagByIDSchema,
};
