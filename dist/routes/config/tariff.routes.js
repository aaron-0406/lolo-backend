"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_handler_1 = require("../../middlewares/auth.handler");
const tariff_controller_1 = require("../../controllers/settings/tariff.controller");
const router = (0, express_1.Router)();
router.get("/", auth_handler_1.JWTAuth, tariff_controller_1.getTariffsController);
exports.default = router;
