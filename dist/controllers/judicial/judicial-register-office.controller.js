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
exports.deletedRegisterOfficeController = exports.updateRegisterOfficeController = exports.createRegisterOfficeController = exports.findAllRegisterOfficesByCHBController = exports.findRegisterOfficeByIdController = void 0;
const judicial_register_office_service_1 = __importDefault(require("../../app/judicial/services/judicial-register-office.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_register_office_model_1 = __importDefault(require("../../db/models/judicial-register-office.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new judicial_register_office_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_REGISTER_OFFICE_TABLE } = judicial_register_office_model_1.default;
const findRegisterOfficeByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const registerOffice = yield service.findByID(id);
        res.json(registerOffice);
    }
    catch (error) {
        next(error);
    }
});
exports.findRegisterOfficeByIdController = findRegisterOfficeByIdController;
const findAllRegisterOfficesByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const registerOffices = yield service.findAllByCHB(parseInt(chb));
        res.json(registerOffices);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllRegisterOfficesByCHBController = findAllRegisterOfficesByCHBController;
const createRegisterOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newRegisterOffice = yield service.create(body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newRegisterOffice.dataValues.id,
            newData: newRegisterOffice.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P40-01",
            entity: JUDICIAL_REGISTER_OFFICE_TABLE,
            entityId: Number(newRegisterOffice.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.json(newRegisterOffice);
    }
    catch (error) {
        next(error);
    }
});
exports.createRegisterOfficeController = createRegisterOfficeController;
const updateRegisterOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldJudicialRegisterOffice, newJudicialRegisterOffice } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialRegisterOffice.dataValues.id,
            newData: newJudicialRegisterOffice.dataValues,
            oldData: oldJudicialRegisterOffice,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P40-02",
            entity: JUDICIAL_REGISTER_OFFICE_TABLE,
            entityId: Number(newJudicialRegisterOffice.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.json(newJudicialRegisterOffice);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRegisterOfficeController = updateRegisterOfficeController;
const deletedRegisterOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const oldRegisterOffice = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: oldRegisterOffice.id,
            oldData: oldRegisterOffice,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P40-03",
            entity: JUDICIAL_REGISTER_OFFICE_TABLE,
            entityId: Number(oldRegisterOffice.id),
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
exports.deletedRegisterOfficeController = deletedRegisterOfficeController;
