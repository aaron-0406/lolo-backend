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
class JudicialCollateralChargesEncumbrancesTypeLoadService {
    constructor() { }
    findAll(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateralChargesEncumbrancesTypeLoad = yield models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.findOne({
                where: {
                    id,
                },
            });
            if (!judicialCollateralChargesEncumbrancesTypeLoad) {
                throw boom_1.default.notFound("Tipo de carga y gravamen no encontrado");
            }
            return judicialCollateralChargesEncumbrancesTypeLoad;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialCollateralChargesEncumbrancesTypeLoad = yield models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.create(data);
            return newJudicialCollateralChargesEncumbrancesTypeLoad;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateralChargesEncumbrancesTypeLoad = yield this.findByID(id);
            const oldJudicialCollateralChargesEncumbrancesTypeLoad = Object.assign({}, judicialCollateralChargesEncumbrancesTypeLoad.get());
            const newJudicialCollateralChargesEncumbrancesTypeLoad = yield judicialCollateralChargesEncumbrancesTypeLoad.update(changes);
            return { oldJudicialCollateralChargesEncumbrancesTypeLoad, newJudicialCollateralChargesEncumbrancesTypeLoad };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateralChargesEncumbrancesTypeLoad = yield this.findByID(id);
            const oldJudicialCollateralChargesEncumbrancesTypeLoad = Object.assign({}, judicialCollateralChargesEncumbrancesTypeLoad.get());
            yield judicialCollateralChargesEncumbrancesTypeLoad.destroy();
            return oldJudicialCollateralChargesEncumbrancesTypeLoad;
        });
    }
}
exports.default = JudicialCollateralChargesEncumbrancesTypeLoadService;
