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
const service = new judicial_subject_service_1.default();
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
    try {
        const body = req.body;
        const newJudicialSubject = yield service.create(body);
        res.status(201).json(newJudicialSubject);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialSubjectController = createJudicialSubjectController;
const updateJudicialSubjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialSubject = yield service.update(id, body);
        res.json(judicialSubject);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialSubjectController = updateJudicialSubjectController;
const deleteJudicialSubjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialSubjectController = deleteJudicialSubjectController;
