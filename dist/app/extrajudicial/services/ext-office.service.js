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
class ExtOfficeService {
    constructor() { }
    findAllByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_OFFICE.findAll({
                where: {
                    customer_id_customer: customerId,
                },
            });
            return rta;
        });
    }
    findAllByCityId(cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_OFFICE.findAll({
                where: {
                    cityId,
                },
            });
            return rta;
        });
    }
    findByID(id, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_OFFICE.findOne({
                where: {
                    id,
                    customer_id_customer: customerId,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("Oficina no encontrada");
            }
            return rta;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExtIpOffice = yield models.EXT_OFFICE.create(data);
            return newExtIpOffice;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const extOffice = yield this.findByID(id, String(changes.customerId));
            const rta = yield extOffice.update(changes);
            return rta;
        });
    }
    updateState(id, customerId, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const extOffice = yield this.findByID(id, customerId);
            const rta = yield extOffice.update(Object.assign(Object.assign({}, extOffice), { state }));
            return rta;
        });
    }
    delete(id, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const extOffice = yield this.findByID(id, customerId);
            yield extOffice.destroy();
            return { id };
        });
    }
}
exports.default = ExtOfficeService;
