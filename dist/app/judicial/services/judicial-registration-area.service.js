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
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_REGISTRATION_AREA.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_REGISTRATION_AREA.findAll({
                where: { customerHasBankId: chb },
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
                        as: "judicialCaseFileHasRegistrationArea",
                        attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
                    },
                ],
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
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
                        as: "judicialCaseFileHasRegistrationArea",
                        attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
                    },
                ],
            });
            if (!judicialRegistrationArea) {
                throw boom_1.default.notFound("Región de Registro no encontrado");
            }
            return judicialRegistrationArea;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialRegistrationArea = yield models.JUDICIAL_REGISTRATION_AREA.create(data);
            yield newJudicialRegistrationArea.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
                        as: "judicialCaseFileHasRegistrationArea",
                        attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
                    },
                ],
            });
            return newJudicialRegistrationArea;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialRegistrationArea = yield this.findByID(id);
            const rta = yield judicialRegistrationArea.update(changes);
            yield rta.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
                        as: "judicialCaseFileHasRegistrationArea",
                        attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
                    },
                ],
            });
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationArea = yield this.findByID(id);
            yield registrationArea.destroy();
            return { id };
        });
    }
}
exports.default = JudicialRegistrationAreaService;
