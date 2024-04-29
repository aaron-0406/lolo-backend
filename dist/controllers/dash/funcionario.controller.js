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
exports.deleteFuncionarioController = exports.updateFuncionarioController = exports.createFuncionarioController = exports.getFuncionarioByIdController = exports.getFuncionariosByCHBController = exports.getFuncionariosController = void 0;
const funcionario_service_1 = __importDefault(require("../../app/dash/services/funcionario.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const funcionario_model_1 = __importDefault(require("../../db/models/funcionario.model"));
const service = new funcionario_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { FUNCIONARIO_TABLE } = funcionario_model_1.default;
const getFuncionariosController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const funcionarios = yield service.findAll();
        res.json(funcionarios);
    }
    catch (error) {
        next(error);
    }
});
exports.getFuncionariosController = getFuncionariosController;
const getFuncionariosByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const funcionario = yield service.findAllByCHB(chb);
        res.json(funcionario);
    }
    catch (error) {
        next(error);
    }
});
exports.getFuncionariosByCHBController = getFuncionariosByCHBController;
const getFuncionarioByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const funcionario = yield service.findOne(id);
        res.json(funcionario);
    }
    catch (error) {
        next(error);
    }
});
exports.getFuncionarioByIdController = getFuncionarioByIdController;
const createFuncionarioController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newFuncionario = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P08-01",
            entity: FUNCIONARIO_TABLE,
            entityId: Number(newFuncionario.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newFuncionario);
    }
    catch (error) {
        next(error);
    }
});
exports.createFuncionarioController = createFuncionarioController;
const updateFuncionarioController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const funcionario = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P08-02",
            entity: FUNCIONARIO_TABLE,
            entityId: Number(funcionario.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(funcionario);
    }
    catch (error) {
        next(error);
    }
});
exports.updateFuncionarioController = updateFuncionarioController;
const deleteFuncionarioController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P08-03",
            entity: FUNCIONARIO_TABLE,
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
exports.deleteFuncionarioController = deleteFuncionarioController;
