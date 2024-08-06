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
const bcrypt_1 = require("../../../libs/bcrypt");
const sequelize_1 = __importDefault(require("../../../libs/sequelize"));
const customer_user_service_1 = __importDefault(require("../../dash/services/customer-user.service"));
const boom_1 = __importDefault(require("@hapi/boom"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const { models } = sequelize_1.default;
const service = new customer_user_service_1.default();
class AuthService {
    constructor() { }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, customerId } = data;
            const userCustomer = yield models.CUSTOMER_USER.findOne({
                where: { email, customerId },
            });
            if (!userCustomer)
                throw boom_1.default.notFound("Correo o contraseña incorrectos");
            if (!(userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.dataValues.state))
                throw boom_1.default.notFound("Usuario inhabilitado");
            if (!(yield (0, bcrypt_1.matchPassword)(password, userCustomer.dataValues.password))) {
                if ((userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.dataValues.loginAttempts) >= 2) {
                    service.updateState(String(customerId), false);
                    throw boom_1.default.notFound("Alcanzó el máximo número de intentos fallidos, su cuenta fue bloqueada.");
                }
                service.failedAttemptsCounter(String(customerId), false);
                throw boom_1.default.notFound("Correo o contraseña incorrectos");
            }
            service.failedAttemptsCounter(String(customerId), true);
            return userCustomer;
        });
    }
    changePassword(data, customerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { repeatPassword, newPassword } = data;
            if (repeatPassword !== newPassword)
                throw boom_1.default.badData("Las contraseñas no coinciden");
            const password = yield (0, bcrypt_1.encryptPassword)(newPassword);
            yield models.CUSTOMER_USER.update({ password }, { where: { id: customerUserId } });
        });
    }
    changeCredentials(data, customerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, lastname, name, phone } = data;
            const customerUser = yield models.CUSTOMER_USER.findOne({
                where: { id: customerUserId },
            });
            if (!customerUser)
                throw boom_1.default.notFound("Usuario no encontrado");
            const oldCustomerUser = Object.assign({}, customerUser.get());
            yield models.CUSTOMER_USER.update({ dni, lastName: lastname, name, phone }, { where: { id: customerUserId } });
            return oldCustomerUser;
        });
    }
    generate2fa(email, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = speakeasy_1.default.generateSecret({ length: 32 }).ascii;
            const qrCodeUrl = speakeasy_1.default.otpauthURL({
                secret: secret,
                label: email,
                issuer: "LoloBank",
            });
            yield models.CUSTOMER_USER.update({ code2fa: secret }, { where: { id: userId } });
            return qrCodeUrl;
        });
    }
    getQrCode(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCustomer = yield models.CUSTOMER_USER.findOne({
                where: { id: userId },
            });
            if (!(userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.dataValues.code2fa))
                throw boom_1.default.notFound("Usuario no tiene habilitado doble factor");
            const email = userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.dataValues.email;
            const secret = userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.dataValues.code2fa;
            const qrCodeUrl = speakeasy_1.default.otpauthURL({
                secret: secret,
                label: email,
                issuer: "LoloBank",
            });
            return qrCodeUrl;
        });
    }
    verify2fa(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCustomer = yield models.CUSTOMER_USER.findOne({
                where: { id: userId },
            });
            const secret = userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.dataValues.code2fa;
            const verificationResult = speakeasy_1.default.totp.verify({
                secret: secret,
                encoding: "ascii",
                token: token,
                window: 6,
            });
            if (!verificationResult) {
                return false;
            }
            if (verificationResult && !(userCustomer === null || userCustomer === void 0 ? void 0 : userCustomer.dataValues.firstAccess)) {
                yield models.CUSTOMER_USER.update({ firstAccess: true }, { where: { id: userId } });
                return true;
            }
            return true;
        });
    }
}
exports.default = AuthService;
