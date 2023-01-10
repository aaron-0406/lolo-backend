"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
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
    if (err instanceof sequelize_1.ValidationError) {
        return res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors,
        });
    }
    next(err);
};
exports.default = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
