"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_handler_1 = require("../../middlewares/auth.handler");
const province_controller_1 = require("../../controllers/settings/province.controller");
const province_schema_1 = __importDefault(require("../../app/settings/schemas/province.schema"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const { getProvinceByDepartmentSchema } = province_schema_1.default;
const router = (0, express_1.Router)();
router.get('/', auth_handler_1.JWTAuth, province_controller_1.getProvincesController);
router.get('/:departmentId', auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getProvinceByDepartmentSchema, "params"), province_controller_1.getAllProvincesByDepartmentController);
exports.default = router;
