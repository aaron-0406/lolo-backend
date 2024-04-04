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
exports.deleteOfficeController = exports.updateOfficeController = exports.updateOfficeStateController = exports.createOfficeController = exports.getOfficeByIdController = exports.getOfficesByCityController = exports.getOfficesController = void 0;
const ext_office_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-office.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const ext_office_model_1 = __importDefault(require("../../db/models/ext-office.model"));
const service = new ext_office_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_OFFICE_TABLE } = ext_office_model_1.default;
const getOfficesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { customerId } = req.params;
        const offices = yield service.findAllByCustomerId(customerId);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P17-05",
            entity: EXT_OFFICE_TABLE,
            entityId: Number(customerId),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(offices);
    }
    catch (error) {
        next(error);
    }
});
exports.getOfficesController = getOfficesController;
const getOfficesByCityController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cityId } = req.params;
        const offices = yield service.findAllByCityId(cityId);
        res.json(offices);
    }
    catch (error) {
        next(error);
    }
});
exports.getOfficesByCityController = getOfficesByCityController;
const getOfficeByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, customerId } = req.params;
        const office = yield service.findByID(id, customerId);
        res.json(office);
    }
    catch (error) {
        next(error);
    }
});
exports.getOfficeByIdController = getOfficeByIdController;
const createOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const body = req.body;
        const newOffice = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P17-01",
            entity: EXT_OFFICE_TABLE,
            entityId: Number(newOffice.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json(newOffice);
    }
    catch (error) {
        next(error);
    }
});
exports.createOfficeController = createOfficeController;
const updateOfficeStateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id, customerId } = req.params;
        const body = req.body;
        const office = yield service.updateState(id, customerId, body.state);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P17-02",
            entity: EXT_OFFICE_TABLE,
            entityId: Number(office.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(office);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOfficeStateController = updateOfficeStateController;
const updateOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        const body = req.body;
        const office = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P17-03",
            entity: EXT_OFFICE_TABLE,
            entityId: Number(office.dataValues.id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
        });
        res.json(office);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOfficeController = updateOfficeController;
const deleteOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q;
    try {
        const { id, customerId } = req.params;
        yield service.delete(id, customerId);
        yield serviceUserLog.create({
            customerUserId: Number((_o = req.user) === null || _o === void 0 ? void 0 : _o.id),
            codeAction: "P17-04",
            entity: EXT_OFFICE_TABLE,
            entityId: Number(id),
            ip: (_p = req.clientIp) !== null && _p !== void 0 ? _p : "",
            customerId: Number((_q = req.user) === null || _q === void 0 ? void 0 : _q.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOfficeController = deleteOfficeController;
