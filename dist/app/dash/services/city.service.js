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
class CityService {
    constructor() { }
    findAll(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CITY.findAll({
                where: {
                    customer_id_customer: customerId,
                },
            });
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield models.CITY.findByPk(id);
            if (!city) {
                throw boom_1.default.notFound("Ciudad no encontrada");
            }
            return city;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCity = yield models.CITY.create(data);
            return newCity;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findOne(id);
            const rta = yield city.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findOne(id);
            yield city.destroy();
            return { id };
        });
    }
}
exports.default = CityService;
