"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const name = joi_1.default.string().min(1).max(150);
const code = joi_1.default.string().min(1).max(150);
const icon = joi_1.default.string().min(1).max(150);
const link = joi_1.default.string().min(1).max(150);
const createPermissionSchema = joi_1.default.object({
    name: name.required(),
    code: code.required(),
    icon: icon.required(),
    link: link.required(),
});
const getPermissionByIdSchema = joi_1.default.object({
    id: id.required(),
});
const getPermissionsSchema = joi_1.default.object({
    code: code.optional(),
});
const updatePermissionSchema = joi_1.default.object({
    name,
    code,
    icon,
    link,
});
exports.default = {
    createPermissionSchema,
    updatePermissionSchema,
    getPermissionByIdSchema,
    getPermissionsSchema,
};
