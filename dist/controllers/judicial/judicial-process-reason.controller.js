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
exports.deleteJudicialProcessReasonController = exports.updateJudicialProcessReasonController = exports.createJudicialProcessReasonController = exports.getJudicialProcessReasonByIdController = exports.getJudicialProcessReasonByCHBController = exports.getJudicialProcessReasonController = void 0;
const judicial_process_reason_service_1 = __importDefault(require("../../app/judicial/services/judicial-process-reason.service"));
const judicial_process_reason_model_1 = __importDefault(require("../../db/models/judicial-process-reason.model"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const { JUDICIAL_PROCESS_REASON_TABLE } = judicial_process_reason_model_1.default;
const service = new judicial_process_reason_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const getJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const judicialProcessReason = yield service.findAll();
        res.json(judicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProcessReasonController = getJudicialProcessReasonController;
const getJudicialProcessReasonByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialJudicialProcessReason = yield service.findAllByCHB(Number(chb));
        res.json(judicialJudicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProcessReasonByCHBController = getJudicialProcessReasonByCHBController;
const getJudicialProcessReasonByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialProcessReason = yield service.findByID(Number(id));
        res.json(judicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialProcessReasonByIdController = getJudicialProcessReasonByIdController;
const createJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newJudicialProcessReason = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P27-01",
            entity: JUDICIAL_PROCESS_REASON_TABLE,
            entityId: Number(newJudicialProcessReason.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newJudicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialProcessReasonController = createJudicialProcessReasonController;
const updateJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialProcessReason = yield service.update(Number(id), body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P27-02",
            entity: JUDICIAL_PROCESS_REASON_TABLE,
            entityId: Number(judicialProcessReason.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(judicialProcessReason);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialProcessReasonController = updateJudicialProcessReasonController;
const deleteJudicialProcessReasonController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const judicialProcessReason = yield service.delete(Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P27-03",
            entity: JUDICIAL_PROCESS_REASON_TABLE,
            entityId: Number(judicialProcessReason.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialProcessReasonController = deleteJudicialProcessReasonController;
