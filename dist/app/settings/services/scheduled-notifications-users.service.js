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
const sequelize_1 = __importDefault(require("../../../libs/sequelize"));
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = sequelize_1.default;
class ScheduledNotificationsUsersService {
    constructor() { }
    findAllByScheduledNotificationId(scheduledNotificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
                where: {
                    scheduledNotificationId: scheduledNotificationId,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("El cliente no tiene notificaciones programadas");
            }
            return rta;
        });
    }
    changeNotificationsUsers(idNotification, scheludeNotificationsUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            const newScheludeNotificationsUsers = JSON.parse(scheludeNotificationsUsers);
            const notifications = yield models.SCHEDULED_NOTIFICATIONS_USERS.findAll({
                where: {
                    scheduledNotificationId: idNotification,
                },
            });
            if (notifications.length) {
                const newNotifications = newScheludeNotificationsUsers.filter((scheludeNotificationsUser) => !notifications.some((notification) => notification.dataValues.customerUserId ===
                    scheludeNotificationsUser.customerUserId));
                const notificationsToDelete = notifications.filter((notification) => !newScheludeNotificationsUsers.some((scheludeNotificationsUser) => notification.dataValues.customerUserId ===
                    scheludeNotificationsUser.customerUserId));
                try {
                    for (const notification of notificationsToDelete) {
                        yield models.SCHEDULED_NOTIFICATIONS_USERS.destroy({
                            where: { customerUserId: notification.dataValues.customerUserId },
                        });
                    }
                    for (const newNotification of newNotifications) {
                        yield models.SCHEDULED_NOTIFICATIONS_USERS.create(newNotification);
                    }
                    return newScheludeNotificationsUsers;
                }
                catch (error) {
                    throw error;
                }
            }
            else {
                for (const newNotification of newScheludeNotificationsUsers) {
                    yield models.SCHEDULED_NOTIFICATIONS_USERS.create(newNotification);
                }
            }
        });
    }
}
exports.default = ScheduledNotificationsUsersService;
