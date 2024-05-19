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
exports.deleteNotificationController = exports.updateNotificaitonController = exports.createNotificationController = exports.getNotificationByLogicKeyController = exports.getNotificationByChbController = exports.getNotificationByIdController = exports.getNotificationsController = void 0;
const scheduled_notifications_service_1 = __importDefault(require("../../app/settings/services/scheduled-notifications.service"));
const service = new scheduled_notifications_service_1.default();
const getNotificationsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield service.findAll();
        res.json(notifications);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationsController = getNotificationsController;
const getNotificationByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield service.findOne(id);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationByIdController = getNotificationByIdController;
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
const getNotificationByLogicKeyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { logicKey } = req.params;
        const notification = yield service.findAllByLogicKey(logicKey);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationByLogicKeyController = getNotificationByLogicKeyController;
const createNotificationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newNotification = yield service.create(body);
        res.status(201).json(newNotification);
    }
    catch (error) {
        next(error);
    }
});
exports.createNotificationController = createNotificationController;
const updateNotificaitonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const bank = yield service.update(id, body);
        res.json(bank);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNotificaitonController = updateNotificaitonController;
const deleteNotificationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNotificationController = deleteNotificationController;
