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
const express_1 = require("express");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const auth_schema_1 = __importDefault(require("../app/customers/schemas/auth.schema"));
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("../libs/jwt");
const { loginSchema } = auth_schema_1.default;
const router = (0, express_1.Router)();
router.post("/signin", (0, validator_handler_1.default)(loginSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("local.signin", { session: false }, (err, user) => {
            if (err)
                return next(err);
            // Singing token with the user
            const _a = user, { password } = _a, rest = __rest(_a, ["password"]);
            const token = (0, jwt_1.signToken)(rest, `${process.env.JWT_SECRET}`);
            return res.json({ success: "Sesión Iniciada", user: rest, token });
        })(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
