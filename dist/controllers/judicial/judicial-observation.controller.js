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
exports.deleteJudicialObservationController = exports.updateJudicialObservationController = exports.createJudicialObservationController = exports.getJudicialObservationByIdController = exports.getJudicialObservationByCHBController = void 0;
const judicial_observation_service_1 = __importDefault(require("../../app/judicial/services/judicial-observation.service"));
const judicial_observation_model_1 = __importDefault(require("../../db/models/judicial-observation.model"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const service = new judicial_observation_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_OBSERVATION_TABLE } = judicial_observation_model_1.default;
const getJudicialObservationByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { fileCase } = req.params;
        console.log("1");
        const judicialObservations = yield service.findAllByCHBAndFileCase(Number(fileCase));
        console.log("2");
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P13-01-02-04",
                entity: JUDICIAL_OBSERVATION_TABLE,
                entityId: Number(fileCase),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.json(judicialObservations);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getJudicialObservationByCHBController = getJudicialObservationByCHBController;
const getJudicialObservationByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialObservation = yield service.findByID(id);
        res.json(judicialObservation);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialObservationByIdController = getJudicialObservationByIdController;
const createJudicialObservationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { body, files, params } = req;
        const newJudicialObservation = yield service.create(body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P13-01-02-01",
            entity: JUDICIAL_OBSERVATION_TABLE,
            entityId: Number(newJudicialObservation.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json(newJudicialObservation);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialObservationController = createJudicialObservationController;
const updateJudicialObservationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const { body, files, params } = req;
        const judicialObservation = yield service.update(id, body, files, {
            code: params.code,
            idCustomer: Number(params.idCustomer),
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P13-01-02-02",
            entity: JUDICIAL_OBSERVATION_TABLE,
            entityId: Number(judicialObservation.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(judicialObservation);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialObservationController = updateJudicialObservationController;
const deleteJudicialObservationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P13-01-02-02",
            entity: JUDICIAL_OBSERVATION_TABLE,
            entityId: Number(id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
        });
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialObservationController = deleteJudicialObservationController;
