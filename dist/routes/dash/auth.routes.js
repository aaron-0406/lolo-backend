"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_schema_1 = __importDefault(require("../../app/dash/schemas/auth.schema"));
const auth_controller_1 = require("../../controllers/dash/auth.controller");
const { loginSchema } = auth_schema_1.default;
const router = (0, express_1.Router)();
router.post("/signin", (0, validator_handler_1.default)(loginSchema, "body"), auth_controller_1.loginDashController);
exports.default = router;
