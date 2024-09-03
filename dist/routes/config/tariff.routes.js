"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_handler_1 = require("../../middlewares/auth.handler");
const tariff_controller_1 = require("../../controllers/settings/tariff.controller");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const tariff_schema_1 = __importDefault(require("../../app/settings/schemas/tariff.schema"));
const { getTariffsSchema, createTariffSchema, updateTariffSchema, deleteTariffSchema } = tariff_schema_1.default;
const router = (0, express_1.Router)();
router.get("/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getTariffsSchema, "params"), tariff_controller_1.getTariffsController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createTariffSchema, "body"), tariff_controller_1.createTariffController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(updateTariffSchema, "body"), tariff_controller_1.updateTariffController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(deleteTariffSchema, "params"), tariff_controller_1.deleteTariffController);
exports.default = router;
