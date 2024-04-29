"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_schema_1 = require("../../app/extrajudicial/schemas/product.schema");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const product_controller_1 = require("../../controllers/extrajudicial/product.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const router = (0, express_1.Router)();
//INFO: CLIENTS SECTION
router.get("/client/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductsByClientCodeSchema, "params"), product_controller_1.getProductsByClientCodeController);
router.get("/client-by-id/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), product_controller_1.getProductByIdController);
//INFO: JUDICIAL - CASE FILE SECTION
router.get("/case-file/:judicialCaseFileId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-03-04"), (0, validator_handler_1.default)(product_schema_1.getProductsByJudicialCaseFileIdSchema, "params"), product_controller_1.getProductsByJudicialCaseFileController);
router.post("/assign-case-files/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-03-02"), (0, validator_handler_1.default)(product_schema_1.assignJudicialCaseFileToProductsSchema, "body"), product_controller_1.assignJudicialCaseFileToProductsController);
router.post("/remove-case-file/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-03-03"), (0, validator_handler_1.default)(product_schema_1.removeJudicialCaseFileFromProductSchema, "body"), product_controller_1.removeJudicialCaseFileFromProductController);
//INFO: DASHBOARD SECTION
router.get("/single/:code", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductByCodeSchema, "params"), product_controller_1.getProductByCodeController);
router.get("/:customerId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(product_schema_1.getProductsByCustomerIdSchema, "params"), product_controller_1.getProductsByCustomerIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-06-01"), (0, validator_handler_1.default)(product_schema_1.createProductSchema, "body"), product_controller_1.createProductController);
router.put("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-06-02"), (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), (0, validator_handler_1.default)(product_schema_1.updateProductSchema, "body"), product_controller_1.updateProductController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-06-03"), (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), product_controller_1.deleteProductController);
exports.default = router;
