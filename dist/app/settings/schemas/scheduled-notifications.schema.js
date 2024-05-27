"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const customerHasBankId = joi_1.default.number();
const nameNotification = joi_1.default.string();
const descriptionNotification = joi_1.default.string();
const frequencyToNotify = joi_1.default.number();
const hourTimeToNotify = joi_1.default.date();
const logicKey = joi_1.default.string();
const state = joi_1.default.boolean();
const createScheduledNotificationSchema = joi_1.default.object({
    nameNotification: nameNotification.required(),
    descriptionNotification: descriptionNotification.required(),
    frequencyToNotify: frequencyToNotify.required(),
    hourTimeToNotify: hourTimeToNotify.required(),
    logicKey: logicKey.required(),
    state: state.required(),
    customerHasBankId: customerHasBankId.required(),
});
const updateScheduledNotificationSchema = joi_1.default.object({
    nameNotification: nameNotification.required(),
    descriptionNotification: descriptionNotification.required(),
    frequencyToNotify: frequencyToNotify.required(),
    hourTimeToNotify: hourTimeToNotify.required(),
    logicKey: logicKey.required(),
    state: state.required(),
});
const getScheduledNotificationSchema = joi_1.default.object({
    id: id.required(),
});
const getScheduledNotificationSchemaByCHBSchema = joi_1.default.object({
    chb: customerHasBankId.required(),
});
const deleteScheduledNotificationSchema = joi_1.default.object({
    id: id.required(),
});
exports.default = {
    createScheduledNotificationSchema,
    updateScheduledNotificationSchema,
    getScheduledNotificationSchema,
    getScheduledNotificationSchemaByCHBSchema,
    deleteScheduledNotificationSchema,
};
