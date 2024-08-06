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
class JudicialRegistrationAreaService {
    constructor() { }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_REGISTRATION_AREA.findAll({
                where: { customerHasBankId: chb },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialRegistrationArea = yield models.JUDICIAL_REGISTRATION_AREA.findOne({
                where: {
                    id,
                },
            });
            if (!judicialRegistrationArea) {
                throw boom_1.default.notFound("Zona Registral no encontrada");
            }
            return judicialRegistrationArea;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialRegistrationArea = yield models.JUDICIAL_REGISTRATION_AREA.create(data);
            return newJudicialRegistrationArea;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialRegistrationArea = yield this.findByID(id);
            const oldJudicialRegistrationArea = Object.assign({}, judicialRegistrationArea.get());
            const newJudicialRegistrationArea = yield judicialRegistrationArea.update(changes);
            return { oldJudicialRegistrationArea, newJudicialRegistrationArea };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationArea = yield this.findByID(id);
            const oldJudicialRegistrationArea = Object.assign({}, registrationArea.get());
            yield registrationArea.destroy();
            return oldJudicialRegistrationArea;
        });
    }
}
exports.default = JudicialRegistrationAreaService;
