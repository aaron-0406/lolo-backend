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
exports.deleteNegotiationController = exports.updateNegotiationController = exports.createNegotiationController = exports.getNegotiationsByIdController = exports.getNegotiationsByCHBController = exports.getNegotiationsController = void 0;
const negotiation_service_1 = __importDefault(require("../../app/dash/services/negotiation.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const negotiation_model_1 = __importDefault(require("../../db/models/negotiation.model"));
const service = new negotiation_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { NEGOTIATION_TABLE } = negotiation_model_1.default;
const getNegotiationsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const negotiations = yield service.findAll();
        res.json(negotiations);
    }
    catch (error) {
        next(error);
    }
});
exports.getNegotiationsController = getNegotiationsController;
const getNegotiationsByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const negotiations = yield service.findAllByCHB(chb);
        res.json(negotiations);
    }
    catch (error) {
        next(error);
    }
});
exports.getNegotiationsByCHBController = getNegotiationsByCHBController;
const getNegotiationsByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const negotiation = yield service.findOne(id);
        res.json(negotiation);
    }
    catch (error) {
        next(error);
    }
});
exports.getNegotiationsByIdController = getNegotiationsByIdController;
const createNegotiationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newNegotiation = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P09-01",
            entity: NEGOTIATION_TABLE,
            entityId: Number(newNegotiation.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newNegotiation);
    }
    catch (error) {
        next(error);
    }
});
exports.createNegotiationController = createNegotiationController;
const updateNegotiationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const negotiation = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P09-02",
            entity: NEGOTIATION_TABLE,
            entityId: Number(negotiation.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(negotiation);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNegotiationController = updateNegotiationController;
const deleteNegotiationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P09-03",
            entity: NEGOTIATION_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNegotiationController = deleteNegotiationController;
