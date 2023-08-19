"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const template_has_values_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/template-has-values.schema"));
const template_has_values_controller_1 = require("../../controllers/extrajudicial/template-has-values.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { createTemplateHasValuesSchema, updateTemplateHasValuesSchema, getTemplateHasValuesByIdSchema, } = template_has_values_schema_1.default;
const router = express_1.default.Router();
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), template_has_values_controller_1.getTemplateHasValuesByTemplateIdController);
router.get("/customer/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), template_has_values_controller_1.getTemplateHasValuesByCustomerIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createTemplateHasValuesSchema, "body"), template_has_values_controller_1.createTemplateHasValuesController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), (0, validator_handler_1.default)(updateTemplateHasValuesSchema, "body"), template_has_values_controller_1.updateTemplateHasValues);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getTemplateHasValuesByIdSchema, "params"), template_has_values_controller_1.deleteTemplateHasValues);
exports.default = router;
