"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const template_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/template.schema"));
const template_controller_1 = require("../../controllers/extrajudicial/template.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getTemplateByCustomerIdSchema } = template_schema_1.default;
const router = express_1.default.Router();
router.get("/customer/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getTemplateByCustomerIdSchema, "params"), template_controller_1.getTemplateByCustomerIdController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getTemplateByCustomerIdSchema, "params"), template_controller_1.getTemplateByIdController);
exports.default = router;
