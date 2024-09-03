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
exports.deleteTariffController = exports.updateTariffController = exports.createTariffController = exports.getTariffsController = void 0;
const tariff_service_1 = __importDefault(require("../../app/settings/services/tariff.service"));
const user_log_1 = require("../../utils/dash/user-log");
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const tariff_model_1 = __importDefault(require("../../db/models/settings/tariff.model"));
const { TARIFF_TABLE } = tariff_model_1.default;
const serviceUserLog = new user_log_service_1.default();
const service = new tariff_service_1.default();
const getTariffsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chb } = req.params;
    const data = yield service.findAll(Number(chb));
    res.status(200).json(data);
});
exports.getTariffsController = getTariffsController;
const createTariffController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const newTariff = yield service.create(req.body);
    const sumary = (0, user_log_1.generateLogSummary)({
        method: req.method,
        id: newTariff === null || newTariff === void 0 ? void 0 : newTariff.dataValues.id,
        newData: newTariff === null || newTariff === void 0 ? void 0 : newTariff.dataValues,
    });
    yield serviceUserLog.create({
        customerId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.customerId),
        customerUserId: Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.id),
        codeAction: "P43-01",
        entity: TARIFF_TABLE,
        entityId: Number(newTariff === null || newTariff === void 0 ? void 0 : newTariff.dataValues.id),
        ip: (_c = req.clientIp) !== null && _c !== void 0 ? _c : "",
        methodSumary: sumary,
    });
    res.status(200).json(newTariff);
});
exports.createTariffController = createTariffController;
const updateTariffController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const { id } = req.params;
    const { oldTariff, newTariff } = yield service.update(Number(id), req.body);
    if (!oldTariff || !newTariff)
        return res.status(404).json({ message: "Tarifa no actualizada" });
    const sumary = (0, user_log_1.generateLogSummary)({
        method: req.method,
        id: id,
        oldData: oldTariff,
        newData: newTariff === null || newTariff === void 0 ? void 0 : newTariff.dataValues,
    });
    yield serviceUserLog.create({
        customerId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.customerId),
        customerUserId: Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.id),
        codeAction: "P43-02",
        entity: TARIFF_TABLE,
        entityId: Number(newTariff === null || newTariff === void 0 ? void 0 : newTariff.dataValues.id),
        ip: (_f = req.clientIp) !== null && _f !== void 0 ? _f : "",
        methodSumary: sumary,
    });
    res.status(200).json(newTariff);
});
exports.updateTariffController = updateTariffController;
const deleteTariffController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    const { id } = req.params;
    const data = yield service.delete(id);
    const sumary = (0, user_log_1.generateLogSummary)({
        method: req.method,
        id: id,
        oldData: data === null || data === void 0 ? void 0 : data.dataValues,
    });
    yield serviceUserLog.create({
        customerId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.customerId),
        customerUserId: Number((_h = req.user) === null || _h === void 0 ? void 0 : _h.id),
        codeAction: "P43-03",
        entity: TARIFF_TABLE,
        entityId: Number(id),
        ip: (_j = req.clientIp) !== null && _j !== void 0 ? _j : "",
        methodSumary: sumary,
    });
    res.status(200).json(id);
});
exports.deleteTariffController = deleteTariffController;
