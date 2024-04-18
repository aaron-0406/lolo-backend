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
class ExtProductNameService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_PRODUCT_NAME.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_PRODUCT_NAME.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("nombres de productos no encontrados");
            }
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extProductName = yield models.EXT_PRODUCT_NAME.findOne({
                where: {
                    id_ext_product_name: id,
                },
            });
            if (!extProductName) {
                throw boom_1.default.notFound("nombre de contacto no encontrado");
            }
            return extProductName;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProductName = yield models.EXT_PRODUCT_NAME.create(data);
            return newProductName;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const extProductName = yield this.findByID(id);
            const rta = yield extProductName.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extProductName = yield this.findByID(id);
            yield extProductName.destroy();
            return { id };
        });
    }
}
exports.default = ExtProductNameService;
