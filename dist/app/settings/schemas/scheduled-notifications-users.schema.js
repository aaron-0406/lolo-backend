"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const customerUserId = joi_1.default.number();
const scheduledNotificationId = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const createAt = joi_1.default.date();
const createScheduledNotificationsUsersSchema = joi_1.default.object({
    customerUserId: customerUserId.required(),
    customerHasBankId: customerHasBankId.required(),
    scheduledNotificationId: scheduledNotificationId.required(),
});
const updateScheduledNotificationsUsersSchema = joi_1.default.object({
    customerUserId: customerUserId,
    scheduledNotificationId: scheduledNotificationId,
});
const changeNotificationsUsersSchema = joi_1.default.object({
    data: joi_1.default.string().required(),
});
const getScheduledNotificationsUsersSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const getScheduledNotificationsUsersByChbSchema = joi_1.default.object({
    id: id.required(),
});
const getScheduledNotificationsUsersByCustomerIdSchema = joi_1.default.object({
    customerUserId: customerUserId.required(),
});
const getScheduledNotificationsUsersBySchuldeNotificationIdSchema = joi_1.default.object({
    scheduledNotificationId: scheduledNotificationId.required(),
});
exports.default = {
    getScheduledNotificationsUsersSchema,
    getScheduledNotificationsUsersByChbSchema,
    getScheduledNotificationsUsersByCustomerIdSchema,
    getScheduledNotificationsUsersBySchuldeNotificationIdSchema,
    createScheduledNotificationsUsersSchema,
    updateScheduledNotificationsUsersSchema,
    changeNotificationsUsersSchema,
};
