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
class JudicialCollateralChargesEncumbrancesService {
    constructor() { }
    findAllByCollateralId(collateralId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rta = yield models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.findAll({
                    where: {
                        judicialCollateralIdJudicialCollateral: collateralId,
                    },
                    attributes: {
                        exclude: [
                            "judicialCollateralChargesEncumbrancesTypeLoadId",
                            "judicialCollateralChargesEncumbrancesId",
                        ],
                    },
                });
                if (!rta) {
                    throw boom_1.default.notFound("Collateral cargas y gravantes no encontradas");
                }
                return rta;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateralChargesEncumbrances = yield models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.findOne({
                where: {
                    id,
                },
                attributes: {
                    exclude: [
                        "judicialCollateralChargesEncumbrancesTypeLoadId",
                        "judicialCollateralChargesEncumbrancesId",
                    ],
                },
            });
            if (!judicialCollateralChargesEncumbrances) {
                throw boom_1.default.notFound("Collateral charges encumbrances no encontrado");
            }
            return judicialCollateralChargesEncumbrances;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialCollateralChargesEncumbrances = yield models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.create(data);
            return newJudicialCollateralChargesEncumbrances;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateralChargesEncumbrances = yield this.findByID(id);
            const rta = yield judicialCollateralChargesEncumbrances.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateralChargesEncumbrances = yield this.findByID(id);
            yield judicialCollateralChargesEncumbrances.destroy();
            return { id };
        });
    }
}
exports.default = JudicialCollateralChargesEncumbrancesService;
