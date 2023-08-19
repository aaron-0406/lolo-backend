"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const customer_has_bank_schema_1 = __importDefault(require("../../app/dash/schemas/customer-has-bank.schema"));
const customer_has_bank_controller_1 = require("../../controllers/dash/customer-has-bank.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getCustomerHasBankSchema, createCustomerHasBankSchema } = customer_has_bank_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, customer_has_bank_controller_1.getCustomerHasBankController);
router.get("/:idCustomer/:idBank", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCustomerHasBankSchema, "params"), customer_has_bank_controller_1.getCustomerHasBankByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createCustomerHasBankSchema, "body"), customer_has_bank_controller_1.createCustomerHasBankController);
router.delete("/:idCustomer/:idBank", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCustomerHasBankSchema, "params"), customer_has_bank_controller_1.deleteCustomerHasBankController);
exports.default = router;
