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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const auth_service_1 = __importDefault(require("../app/extrajudicial/services/auth.service"));
const auth_service_2 = __importDefault(require("../app/dash/services/auth.service"));
const boom_1 = __importDefault(require("@hapi/boom"));
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../config/config"));
const permission_service_1 = __importDefault(require("../app/dash/services/permission.service"));
const service = new auth_service_1.default();
const servicePermission = new permission_service_1.default();
const serviceDash = new auth_service_2.default();
// LOGIN
passport_1.default.use("local.signin", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, code2fa } = req.body;
    try {
        const user = yield service.login({
            email,
            password,
            customerId,
            code2fa,
        });
        if (!!user.dataValues.code2fa) {
            yield service.verify2fa(code2fa, user.dataValues.id);
        }
        else {
            const qrCodeUrl = yield service.generate2fa(user.dataValues.email, user.dataValues.id);
            return done(null, {
                qr: qrCodeUrl,
            });
        }
        const permissions = yield servicePermission.findAllByRoleId(user.dataValues.roleId);
        const permissionsObject = permissions.map((permissions) => {
            return {
                code: permissions.code,
                link: permissions.link,
                icon: permissions.icon,
                name: permissions.name,
            };
        });
        return done(null, Object.assign(Object.assign({}, user.dataValues), { permissions: permissionsObject }));
    }
    catch (error) {
        return done(boom_1.default.badRequest(error), false);
    }
})));
passport_1.default.use("local.signinDash", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield serviceDash.login({ email, password });
        const permissions = yield servicePermission.findAllByRoleId(user.dataValues.roleId);
        const codes = permissions.map((permissions) => permissions.code);
        return done(null, Object.assign(Object.assign({}, user.dataValues), { permissions: codes }));
    }
    catch (error) {
        return done(boom_1.default.badRequest(error), false);
    }
})));
// Passport con JWT
passport_1.default.use("jwt", new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.jwtSecret,
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, payload);
    }
    catch (error) {
        console.log(error);
        return done(error, payload);
    }
})));
