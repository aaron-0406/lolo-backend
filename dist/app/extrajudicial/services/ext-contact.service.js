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
class ExtContactService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_CONTACT.findAll();
            return rta;
        });
    }
    findAllByClient(clientID) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_CONTACT.findAll({
                where: {
                    client_id_client: clientID,
                },
                order: [["created_at", "DESC"]],
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extContact = yield models.EXT_CONTACT.findOne({
                where: {
                    id_ext_contact: id,
                },
            });
            if (!extContact) {
                throw boom_1.default.notFound("Contacto no encontrado");
            }
            return extContact;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExtContact = yield models.EXT_CONTACT.create(data);
            return newExtContact;
        });
    }
    updateState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const extContact = yield this.findByID(id);
            const rta = yield extContact.update(Object.assign(Object.assign({}, extContact), { state }));
            return rta;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const extContact = yield this.findByID(id);
            const rta = yield extContact.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const extContact = yield this.findByID(id);
            yield extContact.destroy();
            return { id };
        });
    }
}
exports.default = ExtContactService;
