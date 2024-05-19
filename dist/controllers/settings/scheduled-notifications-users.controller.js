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
exports.deleteNotificationsUsersController = exports.updateNotificaitonsUsersController = exports.createNotificationsUsersController = exports.getNotificationsUsersBySchuldeNotificationIdController = exports.getNotificationsUsersByChbController = exports.getNotificationsUsersByCustomerIdController = exports.getNotificationsUsersByIdController = exports.getNotificationsUsersController = void 0;
const scheduled_notifications_users_service_1 = __importDefault(require("../../app/settings/services/scheduled-notifications-users.service"));
const service = new scheduled_notifications_users_service_1.default();
const getNotificationsUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield service.findAll();
        res.json(notifications);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationsUsersController = getNotificationsUsersController;
const getNotificationsUsersByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield service.findOne(id);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationsUsersByIdController = getNotificationsUsersByIdController;
const getNotificationsUsersByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCustomer } = req.params;
        const notification = yield service.findAllByCustomerId(idCustomer);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationsUsersByCustomerIdController = getNotificationsUsersByCustomerIdController;
const getNotificationsUsersByChbController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const notification = yield service.findAllByChbId(chb);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationsUsersByChbController = getNotificationsUsersByChbController;
const getNotificationsUsersBySchuldeNotificationIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idSchuldeNotification } = req.params;
        const notification = yield service.findOneById(idSchuldeNotification);
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationsUsersBySchuldeNotificationIdController = getNotificationsUsersBySchuldeNotificationIdController;
const createNotificationsUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newNotification = yield service.create(body);
        res.status(201).json(newNotification);
    }
    catch (error) {
        next(error);
    }
});
exports.createNotificationsUsersController = createNotificationsUsersController;
const updateNotificaitonsUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.updateNotificaitonsUsersController = updateNotificaitonsUsersController;
const deleteNotificationsUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNotificationsUsersController = deleteNotificationsUsersController;
