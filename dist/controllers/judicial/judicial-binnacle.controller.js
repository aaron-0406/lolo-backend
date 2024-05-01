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
exports.deleteJudicialBinnacleController = exports.updateJudicialBinnacleController = exports.createJudicialBinnacleController = exports.getJudicialBinnacleByIdController = exports.getJudicialBinnacleByCHBController = void 0;
const judicial_binnacle_service_1 = __importDefault(require("../../app/judicial/services/judicial-binnacle.service"));
const service = new judicial_binnacle_service_1.default();
const getJudicialBinnacleByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileCase } = req.params;
        const judicialBinnacles = yield service.findAllByCHBAndFileCase(Number(fileCase));
        res.json(judicialBinnacles);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getJudicialBinnacleByCHBController = getJudicialBinnacleByCHBController;
const getJudicialBinnacleByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialBinnacle = yield service.findByID(id);
        res.json(judicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinnacleByIdController = getJudicialBinnacleByIdController;
const createJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, files, params } = req;
        const newJudicialBinnacle = yield service.create(body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        res.status(201).json(newJudicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinnacleController = createJudicialBinnacleController;
const updateJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body, files, params } = req;
        const judicialBinnacle = yield service.update(id, body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        res.json(judicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinnacleController = updateJudicialBinnacleController;
const deleteJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinnacleController = deleteJudicialBinnacleController;
