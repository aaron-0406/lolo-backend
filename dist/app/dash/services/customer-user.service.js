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
            const rta = yield models.CUSTOMER_USER.findAll();
            return rta;
        });
    }
    findAllByCustomerID(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CUSTOMER_USER.findAll({
                include: ["role"],
                attributes: {
                    exclude: ["password"],
                },
                where: {
                    customer_id_customer: customerId,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("Cliente no encontrado");
            }
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models.CUSTOMER_USER.findByPk(id, {
                include: ["role"],
                attributes: { exclude: ["password"] },
            });
            if (!user) {
                throw boom_1.default.notFound("Usuario no encontrado");
            }
            return user;
        });
    }
    failedAttemptsCounter(id, logged) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            const loginAttempts = logged ? 0 : user.dataValues.loginAttempts + 1;
            user.update(Object.assign(Object.assign({}, user), { loginAttempts }));
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user, created] = yield models.CUSTOMER_USER.findOrCreate({
                where: {
                    dni: data.dni,
                    customer_id_customer: data.customerId,
                },
                include: ["role"],
                attributes: {
                    exclude: ["password"],
                },
                defaults: data,
            });
            if (!created) {
                throw boom_1.default.notFound("Usuario ya existente");
            }
            yield user.reload({
                include: ["role"],
                attributes: {
                    exclude: ["password"],
                },
            });
            return user;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            if (changes.password)
                changes.password = yield (0, bcrypt_1.encryptPassword)(changes.password);
            const rta = yield user.update(changes);
            yield rta.reload({
                include: ["role"],
                attributes: {
                    exclude: ["password"],
                },
            });
            return rta;
        });
    }
    updateState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            state !== null && state !== void 0 ? state : this.failedAttemptsCounter(id, true);
            const user = yield this.findOne(id);
            const rta = yield user.update(Object.assign(Object.assign({}, user), { state }));
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
    removeCode2fa(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            const rta = yield user.update(Object.assign(Object.assign({}, user), { code2fa: null, firstAccess: false }));
            return rta;
        });
    }
}
exports.default = CustomerUserService;
