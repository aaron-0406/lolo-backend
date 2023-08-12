"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = exports.Permission = exports.JWTAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const boom_1 = __importDefault(require("@hapi/boom"));
// Authenticate by JWT
const JWTAuth = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            let errorMessage = "Inautorizado";
            if (info && info.name === "JsonWebTokenError")
                errorMessage = "Formato de token invalido!";
            if (info && info.name === "TokenExpiredError")
                errorMessage = "El token ha expirado";
            return next(boom_1.default.unauthorized(errorMessage));
        }
        req.user = user;
        return next();
    })(req, res, next);
};
exports.JWTAuth = JWTAuth;
const Permission = (req, res, next) => {
    return next(boom_1.default.unauthorized("No tiene los permisos necesarios para realizar esta acción"));
};
exports.Permission = Permission;
const checkPermissions = (...permissions) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return next(boom_1.default.unauthorized("No JWT"));
        if (permissions.some((permission) => user.permissions.includes(permission)))
            return next();
        return next(boom_1.default.unauthorized("No tienes permisos para realizar esta petición"));
    };
};
exports.checkPermissions = checkPermissions;
