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
exports.checkPermissionsWithoutParams = exports.checkPermissions = exports.JWTAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const boom_1 = __importDefault(require("@hapi/boom"));
const permission_service_1 = __importDefault(require("../app/dash/services/permission.service"));
const servicePermission = new permission_service_1.default();
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
const checkPermissions = (...permissions) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const findPermissions = yield servicePermission.findAllByRoleId((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roleId) !== null && _b !== void 0 ? _b : 0);
        const user = req.user;
        const userPermissions = findPermissions === null || findPermissions === void 0 ? void 0 : findPermissions.map((permission) => {
            return permission.code;
        });
        if (!user)
            return next(boom_1.default.unauthorized("No JWT"));
        if (permissions.some((permission) => userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.includes(permission)))
            return next();
        return next(boom_1.default.unauthorized("No tienes permisos para realizar esta petición"));
    });
};
exports.checkPermissions = checkPermissions;
const checkPermissionsWithoutParams = (permissions, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const findPermissions = yield servicePermission.findAllByRoleId((_a = user === null || user === void 0 ? void 0 : user.roleId) !== null && _a !== void 0 ? _a : 0);
    const userPermissions = findPermissions === null || findPermissions === void 0 ? void 0 : findPermissions.map((permission) => {
        return permission.code;
    });
    if (!user)
        return false;
    if (permissions.some((permission) => userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.includes(permission)))
        return true;
    return false;
});
exports.checkPermissionsWithoutParams = checkPermissionsWithoutParams;
