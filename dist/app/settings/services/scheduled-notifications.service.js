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
const judicial_scheduled_notifications_job_1 = __importDefault(require("../../../jobs/judicial/judicial-scheduled-notifications.job"));
const { models } = sequelize_1.default;
class ScheduledNotificationsService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.SCHEDULED_NOTIFICATIONS.findAll({
                include: [
                    {
                        model: models.SCHEDULED_NOTIFICATIONS_USERS,
                        as: "scheduledNotificationsUsers",
                        include: [
                            {
                                model: models.CUSTOMER_USER,
                                as: "customerUser",
                            },
                        ],
                    },
                ],
            });
            if (!rta) {
                throw boom_1.default.notFound("No existen notificaciones programadas");
            }
            return rta;
        });
    }
    findAllByChb(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.SCHEDULED_NOTIFICATIONS.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("No existen notificaciones programadas");
            }
            return rta;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newScheduledNotification = yield models.SCHEDULED_NOTIFICATIONS.create(data);
            (0, judicial_scheduled_notifications_job_1.default)();
            return newScheduledNotification;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduledNotification = yield models.SCHEDULED_NOTIFICATIONS.findByPk(id);
            if (!scheduledNotification) {
                throw boom_1.default.notFound("Notificación programada no encontrada");
            }
            yield scheduledNotification.update(data);
            (0, judicial_scheduled_notifications_job_1.default)();
            return scheduledNotification;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduledNotification = yield models.SCHEDULED_NOTIFICATIONS.findByPk(id);
            if (!scheduledNotification) {
                throw boom_1.default.notFound("Notificación programada no encontrada");
            }
            yield scheduledNotification.destroy();
            (0, judicial_scheduled_notifications_job_1.default)();
            return scheduledNotification;
        });
    }
}
exports.default = ScheduledNotificationsService;
