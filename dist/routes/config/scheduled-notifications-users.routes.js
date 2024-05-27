"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const scheduled_notifications_users_controller_1 = require("../../controllers/settings/scheduled-notifications-users.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const scheduled_notifications_users_schema_1 = __importDefault(require("../../app/settings/schemas/scheduled-notifications-users.schema"));
const { getScheduledNotificationsUsersBySchuldeNotificationIdSchema, changeNotificationsUsersSchema, } = scheduled_notifications_users_schema_1.default;
const router = express_1.default.Router();
router.get("/scheduled-notification/:scheduledNotificationId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationsUsersBySchuldeNotificationIdSchema, "params"), scheduled_notifications_users_controller_1.getNotificationsUsersBySchuldeNotificationIdController);
router.post("/change-notifications-users/:idNotification", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(changeNotificationsUsersSchema, "body"), scheduled_notifications_users_controller_1.changeNotificationsUsersController);
exports.default = router;
