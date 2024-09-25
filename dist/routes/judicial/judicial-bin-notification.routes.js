"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_bin_notification_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-bin-notification.schema"));
const judicial_bin_notification_controller_1 = require("../../controllers/judicial/judicial-bin-notification.controller");
const router = express_1.default.Router();
const { getAllNotificationsByBinnacleIdSchema } = judicial_bin_notification_schema_1.default;
router.get("/:binnacleId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-01-06-01"), (0, validator_handler_1.default)(getAllNotificationsByBinnacleIdSchema, "params"), judicial_bin_notification_controller_1.getAllNotificationsByBinnacleIdController);
exports.default = router;
