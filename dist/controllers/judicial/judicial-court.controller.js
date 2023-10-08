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
exports.deleteJudicialCourtController = exports.updateJudicialCourtController = exports.createJudicialCourtController = exports.getJudicialCourtByIdController = exports.getJudicialCourtByCHBController = exports.getJudicialCourtController = void 0;
const judicial_court_service_1 = __importDefault(require("../../app/judicial/services/judicial-court.service"));
const service = new judicial_court_service_1.default();
const getJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialCourts = yield service.findAll();
        res.json(judicialCourts);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCourtController = getJudicialCourtController;
const getJudicialCourtByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialCourts = yield service.findAllByCHB(Number(chb));
        res.json(judicialCourts);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCourtByCHBController = getJudicialCourtByCHBController;
const getJudicialCourtByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialCourt = yield service.findByID(id);
        res.json(judicialCourt);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCourtByIdController = getJudicialCourtByIdController;
const createJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newJudicialCourt = yield service.create(body);
        res.status(201).json(newJudicialCourt);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialCourtController = createJudicialCourtController;
const updateJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialCourt = yield service.update(id, body);
        res.json(judicialCourt);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialCourtController = updateJudicialCourtController;
const deleteJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialCourtController = deleteJudicialCourtController;
