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
exports.deleteJudicialProceduralWayController = exports.updateJudicialProceduralWayController = exports.createJudicialProceduralWayController = exports.getJudicialProceduralWayByIdController = exports.getJudicialProceduralWayByCHBController = exports.getJudicialProceduralWayController = void 0;
const judicial_procedural_way_service_1 = __importDefault(require("../../app/judicial/services/judicial-procedural-way.service"));
const service = new judicial_procedural_way_service_1.default();
const getJudicialProceduralWayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialProceduralWays = yield service.findAll();
        res.json(judicialProceduralWays);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProceduralWayController = getJudicialProceduralWayController;
const getJudicialProceduralWayByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialProceduralWays = yield service.findAllByCHB(Number(chb));
        res.json(judicialProceduralWays);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProceduralWayByCHBController = getJudicialProceduralWayByCHBController;
const getJudicialProceduralWayByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialProceduralWay = yield service.findByID(id);
        res.json(judicialProceduralWay);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProceduralWayByIdController = getJudicialProceduralWayByIdController;
const createJudicialProceduralWayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newJudicialProceduralWay = yield service.create(body);
        res.status(201).json(newJudicialProceduralWay);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialProceduralWayController = createJudicialProceduralWayController;
const updateJudicialProceduralWayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialProceduralWay = yield service.update(id, body);
        res.json(judicialProceduralWay);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialProceduralWayController = updateJudicialProceduralWayController;
const deleteJudicialProceduralWayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialProceduralWayController = deleteJudicialProceduralWayController;
