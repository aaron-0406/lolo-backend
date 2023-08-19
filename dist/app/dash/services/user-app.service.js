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
const bcrypt_1 = require("../../../libs/bcrypt");
const { models } = sequelize_1.default;
class CustomerUserService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.USER_APP.findAll();
            throw boom_1.default.notFound("wtf amigo estas reloco");
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models.USER_APP.findByPk(id);
            if (!user) {
                throw boom_1.default.notFound("Usuario no encontrado");
            }
            return user;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.password = yield (0, bcrypt_1.encryptPassword)(data.password);
            const newUser = yield models.USER_APP.create(data);
            return newUser;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            const rta = yield user.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            yield user.destroy();
            return { id };
        });
    }
}
exports.default = CustomerUserService;
