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
const sequelize_1 = __importDefault(require("../../../libs/sequelize"));
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = sequelize_1.default;
class FuncionarioService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.FUNCIONARIO.findAll({
                attributes: { exclude: ["bankId"] },
            });
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.FUNCIONARIO.findAll({
                attributes: { exclude: ["bankId"] },
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcionario = yield models.FUNCIONARIO.findByPk(id, {
                attributes: { exclude: ["bankId"] },
            });
            if (!funcionario) {
                throw boom_1.default.notFound("Funcionario no encontrado");
            }
            return funcionario;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFuncionario = yield models.FUNCIONARIO.create(data);
            return newFuncionario;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcionario = yield this.findOne(id);
            const oldFuncionario = Object.assign({}, funcionario.get());
            const newFuncionario = yield funcionario.update(changes);
            return { oldFuncionario, newFuncionario };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const funcionario = yield this.findOne(id);
            const oldFuncionario = Object.assign({}, funcionario.get());
            yield funcionario.destroy();
            return oldFuncionario;
        });
    }
}
exports.default = FuncionarioService;
