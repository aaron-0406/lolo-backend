"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error)
            return next(boom_1.default.badRequest(error.message));
        next();
    };
};
exports.default = validatorHandler;
