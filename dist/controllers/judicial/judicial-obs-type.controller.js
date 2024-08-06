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
exports.deleteJudicialObsTypeController = exports.updateJudicialObsTypeController = exports.createJudicialObsTypeController = exports.getJudicialObsTypeByIdController = exports.getJudicialObsTypeByCHBController = exports.getJudicialObsTypeController = void 0;
const judicial_obs_type_service_1 = __importDefault(require("../../app/judicial/services/judicial-obs-type.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_obs_type_model_1 = __importDefault(require("../../db/models/judicial-obs-type.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new judicial_obs_type_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_OBS_TYPE_TABLE } = judicial_obs_type_model_1.default;
const getJudicialObsTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialObsTypes = yield service.findAll();
        res.json(judicialObsTypes);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialObsTypeController = getJudicialObsTypeController;
const getJudicialObsTypeByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { chb } = req.params;
        const judicialObsTypes = yield service.findAllByCHB(chb);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P23-04",
                entity: JUDICIAL_OBS_TYPE_TABLE,
                entityId: Number(chb),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.json(judicialObsTypes);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialObsTypeByCHBController = getJudicialObsTypeByCHBController;
const getJudicialObsTypeByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialObsType = yield service.findByID(id);
        res.json(judicialObsType);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialObsTypeByIdController = getJudicialObsTypeByIdController;
const createJudicialObsTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const body = req.body;
        const newJudicialObsType = yield service.create(body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialObsType.dataValues.id,
            newData: newJudicialObsType.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P23-01",
            entity: JUDICIAL_OBS_TYPE_TABLE,
            entityId: Number(newJudicialObsType.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newJudicialObsType);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialObsTypeController = createJudicialObsTypeController;
const updateJudicialObsTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldJudicialObsType, newJudicialObsType } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialObsType.dataValues.id,
            oldData: oldJudicialObsType,
            newData: newJudicialObsType.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P23-02",
            entity: JUDICIAL_OBS_TYPE_TABLE,
            entityId: Number(newJudicialObsType.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.json(newJudicialObsType);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialObsTypeController = updateJudicialObsTypeController;
const deleteJudicialObsTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        const oldJudicialObsType = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: id,
            oldData: oldJudicialObsType,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P23-03",
            entity: JUDICIAL_OBS_TYPE_TABLE,
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
exports.deleteJudicialObsTypeController = deleteJudicialObsTypeController;
