"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const document_schema_1 = __importDefault(require("../app/customers/schemas/document.schema"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const document_controller_1 = require("../controllers/document.controller");
const { createDocumentSchema } = document_schema_1.default;
const router = express_1.default.Router();
const auth_handler_1 = require("../middlewares/auth.handler");
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createDocumentSchema, "body"), document_controller_1.generateDocumentController);
exports.default = router;
