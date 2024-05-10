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
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_binnacle_model_1 = __importDefault(require("../../db/models/judicial-binnacle.model"));
const service = new judicial_binnacle_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
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
    var _a, _b, _c;
    try {
        const { body, files, params } = req;
        const newJudicialBinnacle = yield service.create(body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-01-01-01",
            entity: JUDICIAL_BINNACLE_TABLE,
            entityId: Number(newJudicialBinnacle.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newJudicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinnacleController = createJudicialBinnacleController;
const updateJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const { body, files, params } = req;
        const judicialBinnacle = yield service.update(id, body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P13-01-01-02",
            entity: JUDICIAL_BINNACLE_TABLE,
            entityId: Number(judicialBinnacle.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(judicialBinnacle);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinnacleController = updateJudicialBinnacleController;
const deleteJudicialBinnacleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P13-01-01-03",
            entity: JUDICIAL_BINNACLE_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinnacleController = deleteJudicialBinnacleController;
