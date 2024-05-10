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
exports.deleteJudicialProcessReasonController = exports.updateJudicialProcessReasonController = exports.createJudicialProcessReasonController = exports.getJudicialProcessReasonByIdController = exports.getJudicialProcessReasonByCHBController = exports.getJudicialProcessReasonController = void 0;
const judicial_process_reason_service_1 = __importDefault(require("../../app/judicial/services/judicial-process-reason.service"));
const service = new judicial_process_reason_service_1.default();
const getJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialProcessReason = yield service.findAll();
        res.json(judicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProcessReasonController = getJudicialProcessReasonController;
const getJudicialProcessReasonByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialJudicialProcessReason = yield service.findAllByCHB(Number(chb));
        res.json(judicialJudicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProcessReasonByCHBController = getJudicialProcessReasonByCHBController;
const getJudicialProcessReasonByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialProcessReason = yield service.findByID(Number(id));
        res.json(judicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProcessReasonByIdController = getJudicialProcessReasonByIdController;
const createJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newJudicialProcessReason = yield service.create(body);
        res.status(201).json(newJudicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialProcessReasonController = createJudicialProcessReasonController;
const updateJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialProcessReason = yield service.update(Number(id), body);
        res.json(judicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialProcessReasonController = updateJudicialProcessReasonController;
const deleteJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(Number(id));
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialProcessReasonController = deleteJudicialProcessReasonController;
