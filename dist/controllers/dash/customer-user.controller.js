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
exports.removeCode2faController = exports.deleteCustomerUserController = exports.updateCustomerUserController = exports.updateCustomerUserStateController = exports.createCustomerUserController = exports.getCustomerUserByIdController = exports.getCustomerUserByCustomerIdController = exports.getCustomerUsersController = void 0;
const customer_user_service_1 = __importDefault(require("../../app/dash/services/customer-user.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const customer_user_model_1 = __importDefault(require("../../db/models/customer-user.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new customer_user_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const getCustomerUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customersBanks = yield service.findAll();
        res.json(customersBanks);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUsersController = getCustomerUsersController;
const getCustomerUserByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const users = yield service.findAllByCustomerID(customerId);
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUserByCustomerIdController = getCustomerUserByCustomerIdController;
const getCustomerUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield service.findOne(id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUserByIdController = getCustomerUserByIdController;
const createCustomerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newUser = yield service.create(body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            newData: newUser.dataValues,
            id: newUser.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P10-01",
            entity: CUSTOMER_USER_TABLE,
            entityId: Number(newUser.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createCustomerUserController = createCustomerUserController;
const updateCustomerUserStateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldUser, newUser } = yield service.updateState(id, body.state);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: oldUser,
            newData: newUser.dataValues,
            id: newUser.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P10-04",
            entity: CUSTOMER_USER_TABLE,
            entityId: Number(newUser.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerUserStateController = updateCustomerUserStateController;
const updateCustomerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        if (!req.body.password && req.body.password != "")
            delete req.body.password;
        const { oldUser, newUser } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: oldUser,
            newData: newUser.dataValues,
            id: newUser.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P10-02",
            entity: CUSTOMER_USER_TABLE,
            entityId: Number(newUser.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerUserController = updateCustomerUserController;
const deleteCustomerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        const oldUser = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: oldUser,
            id: oldUser.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P10-03",
            entity: CUSTOMER_USER_TABLE,
            entityId: Number(id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
            methodSumary: sumary,
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCustomerUserController = deleteCustomerUserController;
const removeCode2faController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q;
    try {
        const { id } = req.params;
        const { oldUser, newUser } = yield service.removeCode2fa(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: oldUser,
            newData: newUser.dataValues,
            id: newUser.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_o = req.user) === null || _o === void 0 ? void 0 : _o.id),
            codeAction: "P10-05",
            entity: CUSTOMER_USER_TABLE,
            entityId: Number(id),
            ip: (_p = req.clientIp) !== null && _p !== void 0 ? _p : "",
            customerId: Number((_q = req.user) === null || _q === void 0 ? void 0 : _q.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.removeCode2faController = removeCode2faController;
