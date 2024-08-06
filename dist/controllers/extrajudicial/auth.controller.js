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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCredentialsController = exports.changePasswordController = exports.loginController = void 0;
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("../../libs/jwt");
const auth_service_1 = __importDefault(require("../../app/extrajudicial/services/auth.service"));
const permission_service_1 = __importDefault(require("../../app/dash/services/permission.service"));
const customer_user_service_1 = __importDefault(require("../../app/dash/services/customer-user.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const user_app_model_1 = __importDefault(require("../../db/models/user-app.model"));
const user_log_1 = require("../../utils/dash/user-log");
const serviceAuth = new auth_service_1.default();
const servicePermission = new permission_service_1.default();
const serviceCustomerUser = new customer_user_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { USER_APP_TABLE } = user_app_model_1.default;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("local.signin", { session: false }, (err, user) => {
            if (err)
                return next(err);
            if (user.qr) {
                return res.json({
                    message: "Utiliza tu aplicación para escanear el código QR y comenzar la autenticación de dos pasos.",
                    qr: user.qr,
                });
            }
            else {
                const _a = user, { password, permissions } = _a, rest = __rest(_a, ["password", "permissions"]);
                const token = (0, jwt_1.signToken)(rest, `${process.env.JWT_SECRET}`);
                return res.json({
                    success: "Sesión Iniciada",
                    user: Object.assign(Object.assign({}, rest), { permissions }),
                    token,
                });
            }
        })(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.loginController = loginController;
const changePasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { newPassword, repeatPassword } = req.body;
        yield serviceAuth.changePassword({ newPassword, repeatPassword }, Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
        yield serviceUserLog.create({
            customerUserId: Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.id),
            codeAction: "P01-01",
            entity: USER_APP_TABLE,
            entityId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.id),
            ip: (_d = req.clientIp) !== null && _d !== void 0 ? _d : "",
            customerId: Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.customerId),
        });
        return res.json({ success: "Contraseña modificada" });
    }
    catch (error) {
        next(error);
    }
});
exports.changePasswordController = changePasswordController;
const changeCredentialsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j, _k, _l;
    try {
        const oldCustomerUser = yield serviceAuth.changeCredentials(req.body, Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.id));
        const user = yield serviceCustomerUser.findOne(String((_g = req.user) === null || _g === void 0 ? void 0 : _g.id));
        const permissions = yield servicePermission.findAllByRoleId(user.dataValues.roleId);
        const customerUser = Object.assign(Object.assign({}, user.dataValues), { permissions });
        const token = (0, jwt_1.signToken)(user.dataValues, `${process.env.JWT_SECRET}`);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: "PUT",
            id: oldCustomerUser.id,
            oldData: oldCustomerUser,
            newData: user.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_h = req.user) === null || _h === void 0 ? void 0 : _h.id),
            codeAction: "P01-02",
            entity: USER_APP_TABLE,
            entityId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.id),
            ip: (_k = req.clientIp) !== null && _k !== void 0 ? _k : "",
            customerId: Number((_l = req.user) === null || _l === void 0 ? void 0 : _l.customerId),
            methodSumary: sumary,
        });
        return res.json({
            user: customerUser,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changeCredentialsController = changeCredentialsController;
