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
exports.deleteJudicialBinDefendantProceduralActionController = exports.updateJudicialBinDefendantProceduralActionController = exports.createJudicialBinDefendantProceduralActionController = exports.getJudicialBinDefendantProceduralActionByIdController = exports.getJudicialBinDefendantProceduralActionByCHBController = void 0;
const judicial_bin_defendant_procedural_action_service_1 = __importDefault(require("../../app/judicial/services/judicial-bin-defendant-procedural-action.service"));
const service = new judicial_bin_defendant_procedural_action_service_1.default();
const getJudicialBinDefendantProceduralActionByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialBinProceduralActions = yield service.findAllByCHB(Number(chb));
        res.json(judicialBinProceduralActions);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinDefendantProceduralActionByCHBController = getJudicialBinDefendantProceduralActionByCHBController;
const getJudicialBinDefendantProceduralActionByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialBinProceduralAction = yield service.findByID(id);
        res.json(judicialBinProceduralAction);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinDefendantProceduralActionByIdController = getJudicialBinDefendantProceduralActionByIdController;
const createJudicialBinDefendantProceduralActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newJudicialBinDefendantProceduralAction = yield service.create(body);
        res.status(201).json(newJudicialBinDefendantProceduralAction);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinDefendantProceduralActionController = createJudicialBinDefendantProceduralActionController;
const updateJudicialBinDefendantProceduralActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialBinProceduralAction = yield service.update(id, body);
        res.json(judicialBinProceduralAction);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinDefendantProceduralActionController = updateJudicialBinDefendantProceduralActionController;
const deleteJudicialBinDefendantProceduralActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinDefendantProceduralActionController = deleteJudicialBinDefendantProceduralActionController;
