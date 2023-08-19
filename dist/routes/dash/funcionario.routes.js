"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const funcionario_schema_1 = __importDefault(require("../../app/dash/schemas/funcionario.schema"));
const funcionario_controller_1 = require("../../controllers/dash/funcionario.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getFuncionarioSchema, getFuncionarioByCHBSchema, createFuncionarioSchema, updateFuncionarioSchema, } = funcionario_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, funcionario_controller_1.getFuncionariosController);
router.get("/all/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getFuncionarioByCHBSchema, "params"), funcionario_controller_1.getFuncionariosByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getFuncionarioSchema, "params"), funcionario_controller_1.getFuncionarioByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createFuncionarioSchema, "body"), funcionario_controller_1.createFuncionarioController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getFuncionarioSchema, "params"), (0, validator_handler_1.default)(updateFuncionarioSchema, "body"), funcionario_controller_1.updateFuncionarioController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getFuncionarioSchema, "params"), funcionario_controller_1.deleteFuncionarioController);
exports.default = router;
