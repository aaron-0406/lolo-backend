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
class JudicialCollateralService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_COLLATERAL.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_COLLATERAL.findAll({
                where: { customerHasBankId: chb },
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_COLLATERAL,
                        as: "judicialCaseFileHasCollateral",
                        attributes: ["id", "judicialCaseFileId", "judicialCollateralId"],
                    },
                ],
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateral = yield models.JUDICIAL_COLLATERAL.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_COLLATERAL,
                        as: "judicialCaseFileHasCollateral",
                        attributes: ["id", "judicialCaseFileId", "judicialCollateralId"],
                    },
                ],
            });
            if (!judicialCollateral) {
                throw boom_1.default.notFound("Collateral no encontrado");
            }
            return judicialCollateral;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialCollateral = yield models.JUDICIAL_COLLATERAL.create(data);
            yield newJudicialCollateral.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_COLLATERAL,
                        as: "judicialCaseFileHasCollateral",
                        attributes: ["id", "judicialCaseFileId", "judicialCollateralId"],
                    },
                ],
            });
            return newJudicialCollateral;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateral = yield this.findByID(id);
            const rta = yield judicialCollateral.update(changes);
            yield rta.reload({
                include: [
                    {
                        model: models.JUDICIAL_CASE_FILE_HAS_COLLATERAL,
                        as: "judicialCaseFileHasCollateral",
                        attributes: ["id", "judicialCaseFileId", "judicialCollateralId"],
                    },
                ],
            });
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collateral = yield this.findByID(id);
            yield collateral.destroy();
            return { id };
        });
    }
}
exports.default = JudicialCollateralService;
