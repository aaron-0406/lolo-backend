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
const { getScheduledNotificationsUsersSchema, createScheduledNotificationsUsersSchema, updateScheduledNotificationsUsersSchema, getScheduledNotificationsUsersByCustomerIdSchema, getScheduledNotificationsUsersByChbSchema, getScheduledNotificationsUsersBySchuldeNotificationIdSchema, changeNotificationsUsersSchema } = scheduled_notifications_users_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, scheduled_notifications_users_controller_1.getNotificationsUsersController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationsUsersSchema, "params"), scheduled_notifications_users_controller_1.getNotificationsUsersByIdController);
router.get("/customer/:customerId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationsUsersByCustomerIdSchema, "params"), scheduled_notifications_users_controller_1.getNotificationsUsersByCustomerIdController);
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationsUsersByChbSchema, "params"), scheduled_notifications_users_controller_1.getNotificationsUsersByChbController);
router.get("/scheduled-notification/:scheduledNotificationId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationsUsersBySchuldeNotificationIdSchema, "params"), scheduled_notifications_users_controller_1.getNotificationsUsersBySchuldeNotificationIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createScheduledNotificationsUsersSchema, "body"), scheduled_notifications_users_controller_1.createNotificationsUsersController);
router.post("/change-notifications-users", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(changeNotificationsUsersSchema, "body"), scheduled_notifications_users_controller_1.changeNotificationsUsersController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationsUsersSchema, "params"), (0, validator_handler_1.default)(updateScheduledNotificationsUsersSchema, "body"), scheduled_notifications_users_controller_1.updateNotificaitonsUsersController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getScheduledNotificationsUsersSchema, "params"), scheduled_notifications_users_controller_1.deleteNotificationsUsersController);
exports.default = router;
