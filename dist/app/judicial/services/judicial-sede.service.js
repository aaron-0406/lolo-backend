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
class judicialSedeService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_SEDE.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_SEDE.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("Sedes judiciales no encontradas");
            }
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialSede = yield models.JUDICIAL_SEDE.findOne({
                where: {
                    id_judicial_sede: id,
                },
            });
            if (!judicialSede) {
                throw boom_1.default.notFound("Sede judicial no encontrada");
            }
            return judicialSede;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialSede = yield models.JUDICIAL_SEDE.create(data);
            return newJudicialSede;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialSede = yield this.findByID(id);
            const oldJudicialSede = Object.assign({}, judicialSede.get());
            const newJudicialSede = yield judicialSede.update(changes);
            return { oldJudicialSede, newJudicialSede };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialSede = yield this.findByID(id);
            const oldJudicialSede = Object.assign({}, judicialSede.get());
            yield judicialSede.destroy();
            return oldJudicialSede;
        });
    }
}
exports.default = judicialSedeService;
