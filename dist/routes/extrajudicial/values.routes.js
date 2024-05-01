"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const values_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/values.schema"));
const values_controller_1 = require("../../controllers/extrajudicial/values.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getValuesByTemplateHasValuesIdSchema } = values_schema_1.default;
const router = express_1.default.Router();
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getValuesByTemplateHasValuesIdSchema, "params"), values_controller_1.getValuesByTemplateHasValuesIdController);
exports.default = router;
