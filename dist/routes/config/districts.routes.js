"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_handler_1 = require("../../middlewares/auth.handler");
const district_controller_1 = require("../../controllers/settings/district.controller");
const router = (0, express_1.Router)();
router.get('/', auth_handler_1.JWTAuth, district_controller_1.getDistrictsController);
exports.default = router;
