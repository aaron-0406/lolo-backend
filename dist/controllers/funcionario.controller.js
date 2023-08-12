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
const funcionario_service_1 = __importDefault(require("../app/boss/services/funcionario.service"));
const service = new funcionario_service_1.default();
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
    try {
        const body = req.body;
        const newFuncionario = yield service.create(body);
        res.status(201).json(newFuncionario);
    }
    catch (error) {
        next(error);
    }
});
exports.createFuncionarioController = createFuncionarioController;
const updateFuncionarioController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const funcionario = yield service.update(id, body);
        res.json(funcionario);
    }
    catch (error) {
        next(error);
    }
});
exports.updateFuncionarioController = updateFuncionarioController;
const deleteFuncionarioController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFuncionarioController = deleteFuncionarioController;
