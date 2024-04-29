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
exports.deleteJudicialCaseFileController = exports.updateJudicialCaseFileController = exports.createJudicialCaseFileController = exports.getJudicialCaseFileByIdController = exports.getJudicialCaseFileByNumberCaseFileController = exports.getJudicialCaseFileByCHBIdController = exports.getJudicialCaseFileByClientIdController = exports.getJudicialCaseFileController = void 0;
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_case_file_service_1 = __importDefault(require("../../app/judicial/services/judicial-case-file.service"));
const judicial_case_file_model_1 = __importDefault(require("../../db/models/judicial-case-file.model"));
const service = new judicial_case_file_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
const getJudicialCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const caseFiles = yield service.findAll();
        res.json(caseFiles);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCaseFileController = getJudicialCaseFileController;
const getJudicialCaseFileByClientIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const caseFiles = yield service.findAllByClient(clientId);
        res.json(caseFiles);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCaseFileByClientIdController = getJudicialCaseFileByClientIdController;
const getJudicialCaseFileByCHBIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const caseFiles = yield service.findAllByCHB(chb, req.query);
        res.json(caseFiles);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCaseFileByCHBIdController = getJudicialCaseFileByCHBIdController;
const getJudicialCaseFileByNumberCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { numberCaseFile, chb } = req.params;
        const caseFile = yield service.findByNumberCaseFile(numberCaseFile, Number(chb));
        res.json(caseFile);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCaseFileByNumberCaseFileController = getJudicialCaseFileByNumberCaseFileController;
const getJudicialCaseFileByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const caseFile = yield service.findByID(id);
        res.json(caseFile);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCaseFileByIdController = getJudicialCaseFileByIdController;
const createJudicialCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { customerId } = req.params;
        const body = req.body;
        const newJudicialCaseFile = yield service.create(body, customerId);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-02",
            entity: JUDICIAL_CASE_FILE_TABLE,
            entityId: Number(newJudicialCaseFile.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newJudicialCaseFile);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialCaseFileController = createJudicialCaseFileController;
const updateJudicialCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const caseFile = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P13-03",
            entity: JUDICIAL_CASE_FILE_TABLE,
            entityId: Number(caseFile.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(caseFile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialCaseFileController = updateJudicialCaseFileController;
const deleteJudicialCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const judicialCaseFile = yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P13-04",
            entity: JUDICIAL_CASE_FILE_TABLE,
            entityId: Number(judicialCaseFile.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialCaseFileController = deleteJudicialCaseFileController;
