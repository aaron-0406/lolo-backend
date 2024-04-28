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
exports.deleteJudicialBinTypeBinnacleController = exports.updateJudicialBinTypeBinnacleController = exports.createJudicialBinTypeBinnacleController = exports.getJudicialBinTypeBinnacleByIdController = exports.getJudicialBinTypeBinnacleByCHBController = void 0;
const judicial_bin_type_binnacle_service_1 = __importDefault(require("../../app/judicial/services/judicial-bin-type-binnacle.service"));
const service = new judicial_bin_type_binnacle_service_1.default();
const getJudicialBinTypeBinnacleByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialBinTypeBinnacles = yield service.findAllByCHB(Number(chb));
        res.json(judicialBinTypeBinnacles);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinTypeBinnacleByCHBController = getJudicialBinTypeBinnacleByCHBController;
const getJudicialBinTypeBinnacleByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialBinTypeBinnacle = yield service.findByID(id);
        res.json(judicialBinTypeBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinTypeBinnacleByIdController = getJudicialBinTypeBinnacleByIdController;
const createJudicialBinTypeBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newJudicialBinTypeBinnacle = yield service.create(body);
        res.status(201).json(newJudicialBinTypeBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinTypeBinnacleController = createJudicialBinTypeBinnacleController;
const updateJudicialBinTypeBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialBinTypeBinnacle = yield service.update(id, body);
        res.json(judicialBinTypeBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinTypeBinnacleController = updateJudicialBinTypeBinnacleController;
const deleteJudicialBinTypeBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinTypeBinnacleController = deleteJudicialBinTypeBinnacleController;
