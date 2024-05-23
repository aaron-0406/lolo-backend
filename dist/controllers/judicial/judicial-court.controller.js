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
exports.deleteJudicialCourtController = exports.updateJudicialCourtController = exports.createJudicialCourtController = exports.getJudicialCourtByIdController = exports.getJudicialCourtByCHBController = exports.getJudicialCourtController = void 0;
const judicial_court_service_1 = __importDefault(require("../../app/judicial/services/judicial-court.service"));
const judicial_court_model_1 = __importDefault(require("../../db/models/judicial-court.model"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const service = new judicial_court_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_COURT_TABLE } = judicial_court_model_1.default;
const getJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialCourts = yield service.findAll();
        res.json(judicialCourts);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCourtController = getJudicialCourtController;
const getJudicialCourtByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialCourts = yield service.findAllByCHB(Number(chb));
        res.json(judicialCourts);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCourtByCHBController = getJudicialCourtByCHBController;
const getJudicialCourtByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialCourt = yield service.findByID(id);
        res.json(judicialCourt);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCourtByIdController = getJudicialCourtByIdController;
const createJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newJudicialCourt = yield service.create(body);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P20-01",
                entity: JUDICIAL_COURT_TABLE,
                entityId: Number(newJudicialCourt.dataValues.id),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.status(201).json(newJudicialCourt);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialCourtController = createJudicialCourtController;
const updateJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialCourt = yield service.update(id, body);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
                codeAction: "P20-02",
                entity: JUDICIAL_COURT_TABLE,
                entityId: Number(judicialCourt.dataValues.id),
                ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
                customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            });
        }
        res.json(judicialCourt);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialCourtController = updateJudicialCourtController;
const deleteJudicialCourtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
                codeAction: "P20-03",
                entity: JUDICIAL_COURT_TABLE,
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
exports.deleteJudicialCourtController = deleteJudicialCourtController;
