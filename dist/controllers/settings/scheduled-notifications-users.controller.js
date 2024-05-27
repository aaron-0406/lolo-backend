"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeNotificationsUsersController = exports.getNotificationsUsersBySchuldeNotificationIdController = void 0;
const scheduled_notifications_users_service_1 = __importDefault(require("../../app/settings/services/scheduled-notifications-users.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const scheduled_notifications_users_model_1 = __importDefault(require("../../db/models/settings/scheduled-notifications-users.model"));
const service = new scheduled_notifications_users_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { SCHEDULED_NOTIFICATIONS_USERS_TABLE } = scheduled_notifications_users_model_1.default;
const getNotificationsUsersBySchuldeNotificationIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { scheduledNotificationId } = req.params;
        const notification = yield service.findAllByScheduledNotificationId(scheduledNotificationId);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationsUsersBySchuldeNotificationIdController = getNotificationsUsersBySchuldeNotificationIdController;
const changeNotificationsUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { idNotification } = req.params;
        const body = req.body;
        const notificationsUsers = yield service.changeNotificationsUsers(idNotification, body.data);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P29-04",
                entity: SCHEDULED_NOTIFICATIONS_USERS_TABLE,
                entityId: Number(idNotification),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.json(notificationsUsers);
    }
    catch (error) {
        next(error);
    }
});
exports.changeNotificationsUsersController = changeNotificationsUsersController;
