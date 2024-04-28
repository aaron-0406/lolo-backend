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
class JudicialBinnacleService {
    constructor() { }
    findAllByCHBAndFileCase(fileCase) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_BINNACLE.findAll({
                include: [
                    {
                        model: models.JUDICIAL_BIN_TYPE_BINNACLE,
                        as: "binnacleType",
                    },
                    {
                        model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
                        as: "judicialBinProceduralStage",
                    },
                ],
                where: {
                    judicialFileCaseId: fileCase,
                },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinnacle = yield models.JUDICIAL_BINNACLE.findOne({
                include: [
                    {
                        model: models.JUDICIAL_BIN_TYPE_BINNACLE,
                        as: "binnacleType",
                    },
                    {
                        model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
                        as: "judicialBinProceduralStage",
                    },
                ],
                where: {
                    id,
                },
            });
            if (!judicialBinnacle) {
                throw boom_1.default.notFound("Bitacora Judicial no encontrada");
            }
            return judicialBinnacle;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialBinnacle = yield models.JUDICIAL_BINNACLE.create(data);
            const binnacle = yield this.findByID(newJudicialBinnacle.dataValues.id);
            return binnacle;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinnacle = yield this.findByID(id);
            const rta = yield judicialBinnacle.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinnacle = yield this.findByID(id);
            yield judicialBinnacle.destroy();
            return { id };
        });
    }
}
exports.default = JudicialBinnacleService;
