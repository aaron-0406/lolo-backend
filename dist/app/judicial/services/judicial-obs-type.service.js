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
class judicialObsTypeService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_OBS_TYPE.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_OBS_TYPE.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("tipos de observaciones no encontrados");
            }
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObsType = yield models.JUDICIAL_OBS_TYPE.findOne({
                where: {
                    id_judicial_obs_type: id,
                },
            });
            if (!judicialObsType) {
                throw boom_1.default.notFound("tipo de observación no encontrado");
            }
            return judicialObsType;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialObsType = yield models.JUDICIAL_OBS_TYPE.create(data);
            return newJudicialObsType;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObsType = yield this.findByID(id);
            const oldJudicialObsType = Object.assign({}, judicialObsType.get());
            const newJudicialObsType = yield judicialObsType.update(changes);
            return { oldJudicialObsType, newJudicialObsType };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObsType = yield this.findByID(id);
            const oldJudicialObsType = Object.assign({}, judicialObsType.get());
            yield judicialObsType.destroy();
            return oldJudicialObsType;
        });
    }
}
exports.default = judicialObsTypeService;
