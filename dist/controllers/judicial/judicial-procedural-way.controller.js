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
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_procedural_way_model_1 = __importDefault(require("../../db/models/judicial-procedural-way.model"));
const service = new judicial_procedural_way_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_PROCEDURAL_WAY_TABLE } = judicial_procedural_way_model_1.default;
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
    var _a, _b, _c;
    try {
        const body = req.body;
        const newJudicialProceduralWay = yield service.create(body);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P22-01",
                entity: JUDICIAL_PROCEDURAL_WAY_TABLE,
                entityId: Number(newJudicialProceduralWay.dataValues.id),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.status(201).json(newJudicialProceduralWay);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialProceduralWayController = createJudicialProceduralWayController;
const updateJudicialProceduralWayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialProceduralWay = yield service.update(id, body);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
                codeAction: "P22-02",
                entity: JUDICIAL_PROCEDURAL_WAY_TABLE,
                entityId: Number(judicialProceduralWay.dataValues.id),
                ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
                customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            });
        }
        res.json(judicialProceduralWay);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialProceduralWayController = updateJudicialProceduralWayController;
const deleteJudicialProceduralWayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
                codeAction: "P22-03",
                entity: JUDICIAL_PROCEDURAL_WAY_TABLE,
                entityId: Number(id),
                ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
                customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            });
        }
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialProceduralWayController = deleteJudicialProceduralWayController;
