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
class DepartmentService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.DEPARTMENT.findAll();
            if (!rta) {
                throw boom_1.default.notFound("No existen departamentos");
            }
            return rta;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield models.DEPARTMENT.create(data);
            return department;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield models.DEPARTMENT.findByPk(id);
            if (!department) {
                throw boom_1.default.notFound("Departamento no encontrado");
            }
            yield department.update(data);
            return department;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield models.DEPARTMENT.findByPk(id);
            if (!department) {
                throw boom_1.default.notFound("Departamento no encontrado");
            }
            yield department.destroy();
            return { id };
        });
    }
}
exports.default = DepartmentService;
