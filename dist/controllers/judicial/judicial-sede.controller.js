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
exports.deleteJudicialSedeController = exports.updateJudicialSedeController = exports.createJudicialSedeController = exports.getJudicialSedeByIdController = exports.getJudicialSedeByCHBController = exports.getJudicialSedeController = void 0;
const judicial_sede_service_1 = __importDefault(require("../../app/judicial/services/judicial-sede.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_sede_model_1 = __importDefault(require("../../db/models/judicial-sede.model"));
const service = new judicial_sede_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_SEDE_TABLE } = judicial_sede_model_1.default;
const getJudicialSedeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialSedes = yield service.findAll();
        res.json(judicialSedes);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialSedeController = getJudicialSedeController;
const getJudicialSedeByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { chb } = req.params;
        const judicialSedes = yield service.findAllByCHB(chb);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P28-04",
                entity: JUDICIAL_SEDE_TABLE,
                entityId: Number(chb),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.json(judicialSedes);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialSedeByCHBController = getJudicialSedeByCHBController;
const getJudicialSedeByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialSede = yield service.findByID(id);
        res.json(judicialSede);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialSedeByIdController = getJudicialSedeByIdController;
const createJudicialSedeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const body = req.body;
        const newJudicialSede = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P28-01",
            entity: JUDICIAL_SEDE_TABLE,
            entityId: Number(newJudicialSede.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json(newJudicialSede);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialSedeController = createJudicialSedeController;
const updateJudicialSedeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialSede = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P28-02",
            entity: JUDICIAL_SEDE_TABLE,
            entityId: Number(judicialSede.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(judicialSede);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialSedeController = updateJudicialSedeController;
const deleteJudicialSedeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P28-03",
            entity: JUDICIAL_SEDE_TABLE,
            entityId: Number(id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialSedeController = deleteJudicialSedeController;
