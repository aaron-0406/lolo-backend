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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJudicialBinnacleController = exports.updateJudicialBinnacleTariffController = exports.updateJudicialBinnacleController = exports.createJudicialBinnacleController = exports.getJudicialBinnacleByIdController = exports.getJudicialBinnacleByCHBController = void 0;
const judicial_binnacle_service_1 = __importDefault(require("../../app/judicial/services/judicial-binnacle.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_binnacle_model_1 = __importDefault(require("../../db/models/judicial-binnacle.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new judicial_binnacle_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const getJudicialBinnacleByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileCase } = req.params;
        const judicialBinnacles = yield service.findAllByCHBAndFileCase(Number(fileCase), req.query);
        res.json(judicialBinnacles);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getJudicialBinnacleByCHBController = getJudicialBinnacleByCHBController;
const getJudicialBinnacleByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialBinnacle = yield service.findByID(id);
        res.json(judicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinnacleByIdController = getJudicialBinnacleByIdController;
const createJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { body, files, params } = req;
        const { binnacle, allBinFiles } = yield service.create(body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        const _d = binnacle.dataValues, { judicialBinFiles } = _d, restData = __rest(_d, ["judicialBinFiles"]);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: binnacle.dataValues.id,
            newData: Object.assign(Object.assign({}, restData), { binFiles: JSON.stringify(allBinFiles.map((binFile) => binFile.dataValues.originalName)) }),
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-01-01-01",
            entity: JUDICIAL_BINNACLE_TABLE,
            entityId: Number(binnacle.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(binnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinnacleController = createJudicialBinnacleController;
const updateJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    try {
        const { id } = req.params;
        const { body, files, params } = req;
        const { oldJudicialBinacle, newJudicialBinnacle } = yield service.update(id, body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialBinnacle === null || newJudicialBinnacle === void 0 ? void 0 : newJudicialBinnacle.dataValues.id,
            oldData: oldJudicialBinacle,
            newData: newJudicialBinnacle === null || newJudicialBinnacle === void 0 ? void 0 : newJudicialBinnacle.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.id),
            codeAction: "P13-01-01-02",
            entity: JUDICIAL_BINNACLE_TABLE,
            entityId: Number(newJudicialBinnacle === null || newJudicialBinnacle === void 0 ? void 0 : newJudicialBinnacle.dataValues.id),
            ip: (_f = req.clientIp) !== null && _f !== void 0 ? _f : "",
            customerId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.customerId),
            methodSumary: sumary,
        });
        res.json(newJudicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinnacleController = updateJudicialBinnacleController;
const updateJudicialBinnacleTariffController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k;
    try {
        const { id } = req.params;
        const { body } = req;
        const { oldJudicialBinacle, newJudicialBinnacle } = yield service.updateTariff(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialBinnacle.dataValues.id,
            oldData: Object.assign(Object.assign({}, oldJudicialBinacle), { tariffHistory: oldJudicialBinacle.tariffHistory.replace(/"/g, "").split(",") }),
            newData: Object.assign(Object.assign({}, newJudicialBinnacle.dataValues), { tariffHistory: newJudicialBinnacle.dataValues.tariffHistory.replace(/"/g, "").split(",") }),
        });
        yield serviceUserLog.create({
            customerUserId: Number((_h = req.user) === null || _h === void 0 ? void 0 : _h.id),
            codeAction: "P13-01-01-02",
            entity: JUDICIAL_BINNACLE_TABLE,
            entityId: Number(newJudicialBinnacle.dataValues.id),
            ip: (_j = req.clientIp) !== null && _j !== void 0 ? _j : "",
            customerId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.customerId),
            methodSumary: sumary,
        });
        res.json(newJudicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinnacleTariffController = updateJudicialBinnacleTariffController;
const deleteJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o;
    try {
        const { id } = req.params;
        const oldJudicialBinacle = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: id,
            oldData: oldJudicialBinacle,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_l = req.user) === null || _l === void 0 ? void 0 : _l.id),
            codeAction: "P13-01-01-03",
            entity: JUDICIAL_BINNACLE_TABLE,
            entityId: Number(id),
            ip: (_m = req.clientIp) !== null && _m !== void 0 ? _m : "",
            customerId: Number((_o = req.user) === null || _o === void 0 ? void 0 : _o.customerId),
            methodSumary: sumary,
        });
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinnacleController = deleteJudicialBinnacleController;
