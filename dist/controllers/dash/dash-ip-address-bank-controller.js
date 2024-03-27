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
exports.deleteDashIpAddressController = exports.updateDashIpAddressController = exports.updateDashIpAddressStateController = exports.createDashIpAddressController = exports.getDashIpAddressByIdController = exports.getDashIpAddressByIpController = exports.getDashIpAddressController = void 0;
const dash_ip_address_bank_service_1 = __importDefault(require("../../app/dash/services/dash-ip-address-bank.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const dash_ip_address_bank_model_1 = __importDefault(require("../../db/models/dash-ip-address-bank.model"));
const service = new dash_ip_address_bank_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { DASH_IP_ADDRESS_BANK_TABLE } = dash_ip_address_bank_model_1.default;
const getDashIpAddressController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashIpAddress = yield service.findAll();
        res.json(dashIpAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.getDashIpAddressController = getDashIpAddressController;
const getDashIpAddressByIpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ip } = req.params;
        const dashIpAddress = yield service.findByIP(ip);
        res.json(dashIpAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.getDashIpAddressByIpController = getDashIpAddressByIpController;
const getDashIpAddressByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dashIpAddress = yield service.findByID(id);
        res.json(dashIpAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.getDashIpAddressByIdController = getDashIpAddressByIdController;
const createDashIpAddressController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newDashIpAddress = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P14-01",
            entity: DASH_IP_ADDRESS_BANK_TABLE,
            entityId: Number(newDashIpAddress.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newDashIpAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.createDashIpAddressController = createDashIpAddressController;
const updateDashIpAddressStateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const user = yield service.updateState(id, body.state);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P14-02",
            entity: DASH_IP_ADDRESS_BANK_TABLE,
            entityId: Number(user.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateDashIpAddressStateController = updateDashIpAddressStateController;
const updateDashIpAddressController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const dashIpAddress = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P14-03",
            entity: DASH_IP_ADDRESS_BANK_TABLE,
            entityId: Number(dashIpAddress.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(dashIpAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.updateDashIpAddressController = updateDashIpAddressController;
const deleteDashIpAddressController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P14-04",
            entity: DASH_IP_ADDRESS_BANK_TABLE,
            entityId: Number(id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDashIpAddressController = deleteDashIpAddressController;
