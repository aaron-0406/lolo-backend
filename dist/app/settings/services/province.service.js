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
class ProvinceService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.PROVINCE.findAll();
            if (!rta) {
                throw boom_1.default.notFound("No existen provincias");
            }
            return rta;
        });
    }
    findAllByDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.PROVINCE.findAll({
                where: {
                    departmentId,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("No existen provincias");
            }
            return rta;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProvince = yield models.PROVINCE.create(data);
            return newProvince;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const province = yield models.PROVINCE.findByPk(id);
            if (!province) {
                throw boom_1.default.notFound("Provincia no encontrada");
            }
            yield province.update(data);
            return province;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const province = yield models.PROVINCE.findByPk(id);
            if (!province) {
                throw boom_1.default.notFound("Provincia no encontrada");
            }
            yield province.destroy();
            return { id };
        });
    }
}
exports.default = ProvinceService;
