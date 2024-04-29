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
exports.deleteIpAddressController = exports.updateIpAddressController = exports.updateIpAddressStateController = exports.createIpAddressController = exports.getIpAddressByIdController = exports.getIpAddressByIpController = exports.getIpAddressesController = void 0;
const ext_ip_address_bank_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-ip-address-bank.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const ext_ip_address_bank_model_1 = __importDefault(require("../../db/models/ext-ip-address-bank.model"));
const service = new ext_ip_address_bank_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_IP_ADDRESS_BANK_TABLE } = ext_ip_address_bank_model_1.default;
const getIpAddressesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const ipAddress = yield service.findAllByCustomerId(customerId);
        res.json(ipAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.getIpAddressesController = getIpAddressesController;
const getIpAddressByIpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ip, customerId } = req.params;
        const ipAddress = yield service.findByIP(ip, customerId);
        res.json(ipAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.getIpAddressByIpController = getIpAddressByIpController;
const getIpAddressByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, customerId } = req.params;
        const ipAddress = yield service.findByID(id, customerId);
        res.json(ipAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.getIpAddressByIdController = getIpAddressByIdController;
const createIpAddressController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newIpAddress = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P15-01",
            entity: EXT_IP_ADDRESS_BANK_TABLE,
            entityId: Number(newIpAddress.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newIpAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.createIpAddressController = createIpAddressController;
const updateIpAddressStateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id, customerId } = req.params;
        const body = req.body;
        const ipAddress = yield service.updateState(id, customerId, body.state);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P15-02",
            entity: EXT_IP_ADDRESS_BANK_TABLE,
            entityId: Number(ipAddress.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(ipAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.updateIpAddressStateController = updateIpAddressStateController;
const updateIpAddressController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const ipAddress = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P15-03",
            entity: EXT_IP_ADDRESS_BANK_TABLE,
            entityId: Number(ipAddress.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(ipAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.updateIpAddressController = updateIpAddressController;
const deleteIpAddressController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id, customerId } = req.params;
        yield service.delete(id, customerId);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P15-04",
            entity: EXT_IP_ADDRESS_BANK_TABLE,
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
exports.deleteIpAddressController = deleteIpAddressController;
