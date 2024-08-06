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
exports.deletedNotaryController = exports.updateNotaryController = exports.createNotaryController = exports.findAllNotariesByCHBController = exports.findNotaryByIdController = void 0;
const judicial_notary_service_1 = __importDefault(require("../../app/judicial/services/judicial-notary.service"));
const judicial_notary_model_1 = __importDefault(require("../../db/models/judicial-notary.model"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new judicial_notary_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_NOTARY_TABLE } = judicial_notary_model_1.default;
const findNotaryByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const notary = yield service.findByID(id);
        res.json(notary);
    }
    catch (error) {
        next(error);
    }
});
exports.findNotaryByIdController = findNotaryByIdController;
const findAllNotariesByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const notaries = yield service.findAllByCHB(parseInt(chb));
        res.json(notaries);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllNotariesByCHBController = findAllNotariesByCHBController;
const createNotaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newNotary = yield service.create(body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newNotary.dataValues.id,
            newData: newNotary.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P41-01",
            entity: JUDICIAL_NOTARY_TABLE,
            entityId: Number(newNotary.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.json(newNotary);
    }
    catch (error) {
        next(error);
    }
});
exports.createNotaryController = createNotaryController;
const updateNotaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldJudicialNotary, newJudicialNotary } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialNotary.dataValues.id,
            newData: newJudicialNotary.dataValues,
            oldData: oldJudicialNotary,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P41-02",
            entity: JUDICIAL_NOTARY_TABLE,
            entityId: Number(newJudicialNotary.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.json(newJudicialNotary);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNotaryController = updateNotaryController;
const deletedNotaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const oldNotary = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: oldNotary.id,
            oldData: oldNotary,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P41-03",
            entity: JUDICIAL_NOTARY_TABLE,
            entityId: Number(oldNotary.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deletedNotaryController = deletedNotaryController;
