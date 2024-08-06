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
exports.deleteJudicialSubjectController = exports.updateJudicialSubjectController = exports.createJudicialSubjectController = exports.getJudicialSubjectByIdController = exports.getJudicialSubjectByCHBController = exports.getJudicialSubjectController = void 0;
const judicial_subject_service_1 = __importDefault(require("../../app/judicial/services/judicial-subject.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_subject_model_1 = __importDefault(require("../../db/models/judicial-subject.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new judicial_subject_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_SUBJECT_TABLE } = judicial_subject_model_1.default;
const getJudicialSubjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialSubjects = yield service.findAll();
        res.json(judicialSubjects);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialSubjectController = getJudicialSubjectController;
const getJudicialSubjectByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialSubjects = yield service.findAllByCHB(Number(chb));
        res.json(judicialSubjects);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialSubjectByCHBController = getJudicialSubjectByCHBController;
const getJudicialSubjectByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialSubject = yield service.findByID(id);
        res.json(judicialSubject);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialSubjectByIdController = getJudicialSubjectByIdController;
const createJudicialSubjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newJudicialSubject = yield service.create(body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialSubject.dataValues.id,
            newData: newJudicialSubject.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P21-01",
            entity: JUDICIAL_SUBJECT_TABLE,
            entityId: Number(newJudicialSubject.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newJudicialSubject);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialSubjectController = createJudicialSubjectController;
const updateJudicialSubjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldJudicialSubject, newJudicialSubject } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newJudicialSubject.dataValues.id,
            oldData: oldJudicialSubject,
            newData: newJudicialSubject.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P21-02",
            entity: JUDICIAL_SUBJECT_TABLE,
            entityId: Number(newJudicialSubject.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.json(newJudicialSubject);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialSubjectController = updateJudicialSubjectController;
const deleteJudicialSubjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const oldJudicialSubject = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: id,
            oldData: oldJudicialSubject,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P21-03",
            entity: JUDICIAL_SUBJECT_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialSubjectController = deleteJudicialSubjectController;
