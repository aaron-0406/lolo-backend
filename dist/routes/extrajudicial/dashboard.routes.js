"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boom_1 = __importDefault(require("@hapi/boom"));
const multer_handler_1 = require("../../middlewares/multer.handler");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const dashboard_schema_1 = require("../../app/dash/schemas/dashboard.schema");
const dashboard_controller_1 = require("../../controllers/extrajudicial/dashboard.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const router = (0, express_1.Router)();
const multerFile = (req, res, next) => {
    multer_handler_1.archivosExcel.single("file")(req, res, (err) => {
        if (err)
            return next(boom_1.default.badRequest(err));
        return next();
    });
};
router.post("/xslx", auth_handler_1.JWTAuth, multerFile, (0, validator_handler_1.default)(dashboard_schema_1.excelFileSchema, "body"), dashboard_controller_1.readXslxController);
router.post("/clients", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(dashboard_schema_1.createClientsSchema, "body"), dashboard_controller_1.createClientsXslxController);
router.post("/delete-clients", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(dashboard_schema_1.deleteClientsSchema, "body"), dashboard_controller_1.deleteClientsXslxController);
router.post("/products", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(dashboard_schema_1.createProductSchema, "body"), dashboard_controller_1.createProductsXslxController);
router.post("/delete-products", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(dashboard_schema_1.deleteProductSchema, "body"), dashboard_controller_1.deleteProductsXslxController);
router.post("/send-xslx", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(dashboard_schema_1.sendXlsxEmail, "body"), dashboard_controller_1.sendXslxController);
exports.default = router;
