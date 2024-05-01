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
exports.deleteDirectionController = exports.updateDirectionController = exports.createDirectionController = exports.getDirectionByIdController = exports.getDirectionByClientIdController = exports.getAllDirectionsController = void 0;
const direction_service_1 = __importDefault(require("../../app/extrajudicial/services/direction.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const direction_model_1 = __importDefault(require("../../db/models/direction.model"));
const service = new direction_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { DIRECTION_TABLE } = direction_model_1.default;
const getAllDirectionsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const directions = yield service.findAll();
        res.json(directions);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllDirectionsController = getAllDirectionsController;
const getDirectionByClientIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const directions = yield service.findAllByClient(clientId);
        res.json(directions);
    }
    catch (error) {
        next(error);
    }
});
exports.getDirectionByClientIdController = getDirectionByClientIdController;
const getDirectionByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const direction = yield service.findByID(id);
        res.json(direction);
    }
    catch (error) {
        next(error);
    }
});
exports.getDirectionByIdController = getDirectionByIdController;
const createDirectionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newDirection = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P02-02-05-01",
            entity: DIRECTION_TABLE,
            entityId: Number(newDirection.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newDirection);
    }
    catch (error) {
        next(error);
    }
});
exports.createDirectionController = createDirectionController;
const updateDirectionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const direction = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P02-02-05-02",
            entity: DIRECTION_TABLE,
            entityId: Number(direction.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(direction);
    }
    catch (error) {
        next(error);
    }
});
exports.updateDirectionController = updateDirectionController;
const deleteDirectionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P02-02-05-03",
            entity: DIRECTION_TABLE,
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
exports.deleteDirectionController = deleteDirectionController;
