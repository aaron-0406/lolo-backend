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
class JudicialRegisterOfficeService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_REGISTER_OFFICE.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_REGISTER_OFFICE.findAll({
                where: { customerHasBankId: chb },
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
                        as: "judicialCaseFileHasRegisterOffice",
                        attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
                    },
                ],
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialRegisterOffice = yield models.JUDICIAL_REGISTER_OFFICE.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
                        as: "judicialCaseFileHasRegisterOffice",
                        attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
                    },
                ],
            });
            if (!judicialRegisterOffice) {
                throw boom_1.default.notFound("Registro de Oficina no encontrado");
            }
            return judicialRegisterOffice;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialRegisterOffice = yield models.JUDICIAL_REGISTER_OFFICE.create(data);
            yield newJudicialRegisterOffice.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
                        as: "judicialCaseFileHasRegisterOffice",
                        attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
                    },
                ],
            });
            return newJudicialRegisterOffice;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialRegisterOffice = yield this.findByID(id);
            const rta = yield judicialRegisterOffice.update(changes);
            yield rta.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
                        as: "judicialCaseFileHasRegisterOffice",
                        attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
                    },
                ],
            });
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerOffice = yield this.findByID(id);
            yield registerOffice.destroy();
            return { id };
        });
    }
}
exports.default = JudicialRegisterOfficeService;
