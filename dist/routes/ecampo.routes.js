"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const ecampo_schema_1 = __importDefault(require("../app/customers/schemas/ecampo.schema"));
const ecampo_controllr_1 = require("../controllers/ecampo.controllr");
const { getECampoByIdSchema } = ecampo_schema_1.default;
const router = express_1.default.Router();
const auth_handler_1 = require("../middlewares/auth.handler");
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getECampoByIdSchema, "params"), ecampo_controllr_1.findECampoByTemplateIdController);
exports.default = router;
