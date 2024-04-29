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
exports.deleteJudicialBinProceduralStageController = exports.updateJudicialBinProceduralStageController = exports.createJudicialBinProceduralStageController = exports.getJudicialBinProceduralStageByIdController = exports.getJudicialBinProceduralStageByCHBController = void 0;
const judicial_bin_procedural_stage_service_1 = __importDefault(require("../../app/judicial/services/judicial-bin-procedural-stage.service"));
const service = new judicial_bin_procedural_stage_service_1.default();
const getJudicialBinProceduralStageByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialBinProceduralStages = yield service.findAllByCHB(Number(chb));
        res.json(judicialBinProceduralStages);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinProceduralStageByCHBController = getJudicialBinProceduralStageByCHBController;
const getJudicialBinProceduralStageByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialBinProceduralStage = yield service.findByID(id);
        res.json(judicialBinProceduralStage);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinProceduralStageByIdController = getJudicialBinProceduralStageByIdController;
const createJudicialBinProceduralStageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newJudicialBinProceduralStage = yield service.create(body);
        res.status(201).json(newJudicialBinProceduralStage);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinProceduralStageController = createJudicialBinProceduralStageController;
const updateJudicialBinProceduralStageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialBinProceduralStage = yield service.update(id, body);
        res.json(judicialBinProceduralStage);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinProceduralStageController = updateJudicialBinProceduralStageController;
const deleteJudicialBinProceduralStageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinProceduralStageController = deleteJudicialBinProceduralStageController;
