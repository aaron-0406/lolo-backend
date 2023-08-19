"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const bank_schema_1 = __importDefault(require("../../app/dash/schemas/bank.schema"));
const bank_controller_1 = require("../../controllers/dash/bank.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getBankSchema, createBankSchema, updateBankSchema } = bank_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, bank_controller_1.getBanksController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getBankSchema, "params"), bank_controller_1.getBankByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createBankSchema, "body"), bank_controller_1.createBankController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getBankSchema, "params"), (0, validator_handler_1.default)(updateBankSchema, "body"), bank_controller_1.updateBankController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getBankSchema, "params"), bank_controller_1.deleteBankController);
exports.default = router;
