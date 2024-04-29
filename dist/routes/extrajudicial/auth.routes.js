"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/auth.schema"));
const auth_controller_1 = require("../../controllers/extrajudicial/auth.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { loginSchema, changePasswordSchema, changeCredentialsSchema } = auth_schema_1.default;
const router = (0, express_1.Router)();
router.post("/signin", (0, validator_handler_1.default)(loginSchema, "body"), auth_controller_1.loginController);
router.post("/change-password", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P01-01"), (0, validator_handler_1.default)(changePasswordSchema, "body"), auth_controller_1.changePasswordController);
router.post("/change-credentials", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P01-02"), (0, validator_handler_1.default)(changeCredentialsSchema, "body"), auth_controller_1.changeCredentialsController);
exports.default = router;
