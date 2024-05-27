"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const scheduled_notifications_controller_1 = require("../../controllers/settings/scheduled-notifications.controller");
const scheduled_notifications_schema_1 = __importDefault(require("../../app/settings/schemas/scheduled-notifications.schema"));
const { getScheduledNotificationSchema, getScheduledNotificationSchemaByCHBSchema, createScheduledNotificationSchema, updateScheduledNotificationSchema, deleteScheduledNotificationSchema, } = scheduled_notifications_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationSchemaByCHBSchema, "params"), scheduled_notifications_controller_1.getNotificationByChbController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P29-01"), (0, validator_handler_1.default)(createScheduledNotificationSchema, "body"), scheduled_notifications_controller_1.createNotificationController);
router.put("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P29-02"), (0, validator_handler_1.default)(getScheduledNotificationSchema, "params"), (0, validator_handler_1.default)(updateScheduledNotificationSchema, "body"), scheduled_notifications_controller_1.updateNotificaitonController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P29-03"), (0, validator_handler_1.default)(deleteScheduledNotificationSchema, "params"), scheduled_notifications_controller_1.deleteNotificationController);
exports.default = router;
