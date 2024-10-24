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
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = sequelize_1.default;
class AuthService {
    constructor() { }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const userApp = yield models.USER_APP.findOne({
                where: { email },
            });
            if (!userApp)
                throw boom_1.default.notFound("Correo o contraseña incorrectos");
            if (!(userApp === null || userApp === void 0 ? void 0 : userApp.dataValues.state))
                throw boom_1.default.notFound("Usuario inhabilitado");
            if (!(yield (0, bcrypt_1.matchPassword)(password, userApp.dataValues.password)))
                throw boom_1.default.notFound("Correo o contraseña incorrectos");
            return userApp;
        });
    }
}
exports.default = AuthService;
