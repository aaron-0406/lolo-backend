"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_handler_1 = require("../../middlewares/auth.handler");
const district_controller_1 = require("../../controllers/settings/district.controller");
const district_schema_1 = __importDefault(require("../../app/settings/schemas/district.schema"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const { getDistrictByProvinceSchema } = district_schema_1.default;
const router = (0, express_1.Router)();
router.get('/', auth_handler_1.JWTAuth, district_controller_1.getDistrictsController);
router.get("/:provinceId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getDistrictByProvinceSchema, "params"), district_controller_1.getAllDistrictsByProvinceController);
exports.default = router;
