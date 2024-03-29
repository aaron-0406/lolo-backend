"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_schema_1 = require("../app/customers/schemas/product.schema");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const product_controller_1 = require("../controllers/product.controller");
const auth_handler_1 = require("../middlewares/auth.handler");
const router = (0, express_1.Router)();
router.get("/client/:code", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductsByClientCodeSchema, "params"), product_controller_1.getProductsByClientCodeController);
router.get("/single/:code", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductByCodeSchema, "params"), product_controller_1.getProductByCodeController);
router.get("/:customerId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductsByCustomerIdSchema, "params"), product_controller_1.getProductsByCustomerIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.createProductSchema, "body"), product_controller_1.createProductController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), (0, validator_handler_1.default)(product_schema_1.updateProductSchema, "body"), product_controller_1.updateProductController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), (0, validator_handler_1.default)(product_schema_1.changeProductSchema, "body"), product_controller_1.changeProductController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), product_controller_1.deleteProductController);
exports.default = router;
