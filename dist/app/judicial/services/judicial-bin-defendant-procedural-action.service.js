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
class JudicialBinDefendantProceduralActionService {
    constructor() { }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION.findAll({
                where: { customerHasBankId: chb },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinDefendantProceduralAction = yield models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION.findOne({
                where: {
                    id,
                },
            });
            if (!judicialBinDefendantProceduralAction) {
                throw boom_1.default.notFound("Actuación Procesal Demamdado no encontrada");
            }
            return judicialBinDefendantProceduralAction;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialBinProceduralStage = yield models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION.create(data);
            return newJudicialBinProceduralStage;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinDefendantProceduralAction = yield this.findByID(id);
            const rta = yield judicialBinDefendantProceduralAction.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const defendantProceduralAction = yield this.findByID(id);
            yield defendantProceduralAction.destroy();
            return { id };
        });
    }
}
exports.default = JudicialBinDefendantProceduralActionService;
