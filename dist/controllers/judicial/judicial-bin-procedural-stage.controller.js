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
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_bin_procedural_stage_model_1 = __importDefault(require("../../db/models/judicial-bin-procedural-stage.model"));
const service = new judicial_bin_procedural_stage_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE } = judicial_bin_procedural_stage_model_1.default;
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
    var _a, _b, _c;
    try {
        const body = req.body;
        const newJudicialBinProceduralStage = yield service.create(body);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P24-01",
                entity: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
                entityId: Number(newJudicialBinProceduralStage.dataValues.id),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.status(201).json(newJudicialBinProceduralStage);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinProceduralStageController = createJudicialBinProceduralStageController;
const updateJudicialBinProceduralStageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialBinProceduralStage = yield service.update(id, body);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
                codeAction: "P24-02",
                entity: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
                entityId: Number(judicialBinProceduralStage.dataValues.id),
                ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
                customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            });
        }
        res.json(judicialBinProceduralStage);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinProceduralStageController = updateJudicialBinProceduralStageController;
const deleteJudicialBinProceduralStageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
                codeAction: "P24-03",
                entity: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
                entityId: Number(id),
                ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
                customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            });
        }
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinProceduralStageController = deleteJudicialBinProceduralStageController;
