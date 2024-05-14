"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const customer_schema_1 = __importDefault(require("../../app/dash/schemas/customer.schema"));
const customer_controller_1 = require("../../controllers/dash/customer.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getCustomerByUrlSchema, createCustomerSchema, getCustomerByID, updateCustomerSchema, updateStateCustomerSchema, } = customer_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, customer_controller_1.getAllCustomersController);
router.get("/:urlIdentifier", (0, validator_handler_1.default)(getCustomerByUrlSchema, "params"), customer_controller_1.getCustomerByUrlIdentifierController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createCustomerSchema, "body"), customer_controller_1.createCustomerController);
router.put("/state/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCustomerByID, "params"), (0, validator_handler_1.default)(updateStateCustomerSchema, "body"), customer_controller_1.updateCustomerStateController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCustomerByID, "params"), (0, validator_handler_1.default)(updateCustomerSchema, "body"), customer_controller_1.updateCustomerController);
exports.default = router;
