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
const auth_service_1 = __importDefault(require("../app/customers/services/auth.service"));
const boom_1 = __importDefault(require("@hapi/boom"));
const service = new auth_service_1.default();
// LOGIN
passport_1.default.use("local.signin", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.login({ email, password });
        return done(null, user);
    }
    catch (error) {
        console.log(error);
        return done(boom_1.default.badRequest(error), false);
    }
})));