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
exports.deleteNotificationController = exports.updateNotificaitonController = exports.createNotificationController = exports.getNotificationByChbController = void 0;
const user_log_1 = require("../../utils/dash/user-log");
const scheduled_notifications_service_1 = __importDefault(require("../../app/settings/services/scheduled-notifications.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const scheduled_notifications_model_1 = __importDefault(require("../../db/models/settings/scheduled-notifications.model"));
const service = new scheduled_notifications_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { SCHEDULED_NOTIFICATIONS_TABLE } = scheduled_notifications_model_1.default;
const getNotificationByChbController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const notification = yield service.findAllByChb(chb);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationByChbController = getNotificationByChbController;
const createNotificationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newNotification = yield service.create(body);
        console.log(newNotification);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            newData: newNotification,
            name: newNotification.nameNotification,
            id: newNotification.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P29-01",
            entity: SCHEDULED_NOTIFICATIONS_TABLE,
            entityId: Number(newNotification.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newNotification);
    }
    catch (error) {
        next(error);
    }
});
exports.createNotificationController = createNotificationController;
const updateNotificaitonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldNotification, newNotification } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: oldNotification,
            newData: newNotification,
            id: newNotification.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P29-02",
            entity: SCHEDULED_NOTIFICATIONS_TABLE,
            entityId: Number(id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.json(newNotification);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNotificaitonController = updateNotificaitonController;
const deleteNotificationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const notifiaction = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: notifiaction.dataValues,
            newData: notifiaction.dataValues,
            name: notifiaction.dataValues.name,
            id: notifiaction.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P29-03",
            entity: SCHEDULED_NOTIFICATIONS_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNotificationController = deleteNotificationController;
