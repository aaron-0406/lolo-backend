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
exports.deleteJudicialCaseFileController = exports.updateJudicialCaseFileController = exports.createJudicialCaseFileController = exports.getJudicialCaseFileByIdController = exports.getJudicialCaseFileByNumberCaseFileController = exports.getJudicialCaseFileByClientIdController = exports.getJudicialCaseFileController = void 0;
const judicial_case_file_service_1 = __importDefault(require("../../app/extrajudicial/services/judicial-case-file.service"));
const service = new judicial_case_file_service_1.default();
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
const getJudicialCaseFileByNumberCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const caseFile = yield service.findByNumberCaseFile(code);
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
    try {
        const body = req.body;
        const newJudicialCaseFile = yield service.create(body);
        res.status(201).json(newJudicialCaseFile);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialCaseFileController = createJudicialCaseFileController;
const updateJudicialCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const caseFile = yield service.update(id, body);
        res.json(caseFile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialCaseFileController = updateJudicialCaseFileController;
const deleteJudicialCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialCaseFileController = deleteJudicialCaseFileController;
