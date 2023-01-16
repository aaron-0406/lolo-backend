"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Sign token function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signToken = (payload, secret) => {
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.signToken = signToken;
// Verify token
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
