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
class ExtTagGroupService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_CONTACT_TYPE.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_CONTACT_TYPE.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("tipos de contactos no encontrados");
            }
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extContactType = yield models.EXT_CONTACT_TYPE.findOne({
                where: {
                    id_ext_contact_type: id,
                },
            });
            if (!extContactType) {
                throw boom_1.default.notFound("tipo de contactos no encontrado");
            }
            return extContactType;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newContactType = yield models.EXT_CONTACT_TYPE.create(data);
            return newContactType;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const extContactType = yield this.findByID(id);
            const oldExtContactType = Object.assign({}, extContactType.get());
            const newExtContactType = yield extContactType.update(changes);
            return { oldExtContactType, newExtContactType };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extContactType = yield this.findByID(id);
            const oldExtContactType = Object.assign({}, extContactType.get());
            yield extContactType.destroy();
            return oldExtContactType;
        });
    }
}
exports.default = ExtTagGroupService;
