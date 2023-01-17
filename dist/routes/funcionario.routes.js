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
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const funcionario_schema_1 = __importDefault(require("../app/boss/schemas/funcionario.schema"));
const funcionario_service_1 = __importDefault(require("../app/boss/services/funcionario.service"));
const { getFuncionarioSchema, getFuncionarioByCHBSchema, createFuncionarioSchema, updateFuncionarioSchema, } = funcionario_schema_1.default;
const router = express_1.default.Router();
const service = new funcionario_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const funcionarios = yield service.findAll();
        res.json(funcionarios);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/all/:chb", (0, validator_handler_1.default)(getFuncionarioByCHBSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const funcionario = yield service.findAllByCHB(chb);
        res.json(funcionario);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, validator_handler_1.default)(getFuncionarioSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const funcionario = yield service.findOne(id);
        res.json(funcionario);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createFuncionarioSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newFuncionario = yield service.create(body);
        res.status(201).json(newFuncionario);
    }
    catch (error) {
        next(error);
    }
}));
router.put("/:id", (0, validator_handler_1.default)(getFuncionarioSchema, "params"), (0, validator_handler_1.default)(updateFuncionarioSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const funcionario = yield service.update(id, body);
        res.json(funcionario);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(getFuncionarioSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
