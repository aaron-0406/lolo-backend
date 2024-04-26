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
class judicialObservationService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_OBSERVATION.findAll();
            return rta;
        });
    }
    findAllByCHBAndJudicialCase(chb, judicialCaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_OBSERVATION.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                    judicial_case_file_id_judicial_case_file: judicialCaseId,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("Observaciones no encontradas");
            }
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObs = yield models.JUDICIAL_OBSERVATION.findOne({
                where: {
                    id_judicial_observation: id,
                },
            });
            if (!judicialObs) {
                throw boom_1.default.notFound("Observación no encontrada");
            }
            return judicialObs;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialObs = yield models.JUDICIAL_OBSERVATION.create(data);
            return newJudicialObs;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObsType = yield this.findByID(id);
            const rta = yield judicialObsType.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObs = yield this.findByID(id);
            yield judicialObs.destroy();
            return { id };
        });
    }
}
exports.default = judicialObservationService;
