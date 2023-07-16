"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const boom_1 = __importDefault(require("@hapi/boom"));
// Authenticate by JWT
const JWTAuth = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user)
            return next(boom_1.default.unauthorized(info.message));
        req.user = user;
        return next();
    })(req, res, next);
};
exports.JWTAuth = JWTAuth;
