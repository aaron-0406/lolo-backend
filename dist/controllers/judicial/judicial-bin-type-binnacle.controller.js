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
exports.deleteJudicialBinTypeBinnacleController = exports.updateJudicialBinTypeBinnacleController = exports.createJudicialBinTypeBinnacleController = exports.getJudicialBinTypeBinnacleByIdController = exports.getJudicialBinTypeBinnacleByCHBController = void 0;
const judicial_bin_type_binnacle_service_1 = __importDefault(require("../../app/judicial/services/judicial-bin-type-binnacle.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_bin_type_binnacle_model_1 = __importDefault(require("../../db/models/judicial-bin-type-binnacle.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new judicial_bin_type_binnacle_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_BIN_TYPE_BINNACLE_TABLE } = judicial_bin_type_binnacle_model_1.default;
const getJudicialBinTypeBinnacleByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialBinTypeBinnacles = yield service.findAllByCHB(Number(chb));
        res.json(judicialBinTypeBinnacles);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinTypeBinnacleByCHBController = getJudicialBinTypeBinnacleByCHBController;
const getJudicialBinTypeBinnacleByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialBinTypeBinnacle = yield service.findByID(id);
        res.json(judicialBinTypeBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinTypeBinnacleByIdController = getJudicialBinTypeBinnacleByIdController;
const createJudicialBinTypeBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newJudicialBinTypeBinnacle = yield service.create(body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialBinTypeBinnacle.dataValues.id,
            newData: newJudicialBinTypeBinnacle.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P25-01",
            entity: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
            entityId: Number(newJudicialBinTypeBinnacle.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newJudicialBinTypeBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinTypeBinnacleController = createJudicialBinTypeBinnacleController;
const updateJudicialBinTypeBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldJudicialBinTypeBinnacle, newJudicialBinTypeBinnacle } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialBinTypeBinnacle.dataValues.id,
            oldData: oldJudicialBinTypeBinnacle,
            newData: newJudicialBinTypeBinnacle.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P25-02",
            entity: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
            entityId: Number(newJudicialBinTypeBinnacle.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.json(newJudicialBinTypeBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinTypeBinnacleController = updateJudicialBinTypeBinnacleController;
const deleteJudicialBinTypeBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const oldJudicialBinTypeBinnacle = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: id,
            oldData: oldJudicialBinTypeBinnacle,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P25-03",
            entity: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinTypeBinnacleController = deleteJudicialBinTypeBinnacleController;
