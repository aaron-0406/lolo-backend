"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlers_1 = __importDefault(require("./utils/errorHandlers"));
const logErrors = (err, req, res, next) => {
    next(err);
};
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
};
const boomErrorHandler = (err, req, res, next) => {
    if (err.isBoom) {
        const { output } = err;
        return res.status(output.statusCode).json(output.payload);
    }
    next(err);
};
const ormErrorHandler = (err, req, res, next) => {
    const errorHandler = errorHandlers_1.default[err.constructor.name];
    if (errorHandler) {
        const { status, message, errors } = errorHandler(err);
        return res.status(status).json({ statusCode: status, message, errors });
    }
    next(err);
};
exports.default = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
