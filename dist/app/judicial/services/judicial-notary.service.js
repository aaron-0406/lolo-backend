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
class JudicialNotaryService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_NOTARY.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_NOTARY.findAll({
                where: { customerHasBankId: chb },
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
                        as: "judicialCaseFileHasNotary",
                        attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
                    },
                ],
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialNotary = yield models.JUDICIAL_NOTARY.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
                        as: "judicialCaseFileHasNotary",
                        attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
                    },
                ],
            });
            if (!judicialNotary) {
                throw boom_1.default.notFound("Notario no encontrado");
            }
            return judicialNotary;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialNotary = yield models.JUDICIAL_NOTARY.create(data);
            yield newJudicialNotary.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
                        as: "judicialCaseFileHasNotary",
                        attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
                    },
                ],
            });
            return newJudicialNotary;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialNotary = yield this.findByID(id);
            const rta = yield judicialNotary.update(changes);
            yield rta.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
                        as: "judicialCaseFileHasNotary",
                        attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
                    },
                ],
            });
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const notary = yield this.findByID(id);
            yield notary.destroy();
            return { id };
        });
    }
}
exports.default = JudicialNotaryService;
