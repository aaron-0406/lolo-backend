"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const USER = encodeURIComponent(config_1.default.dbUser);
const PASSWORD = encodeURIComponent(config_1.default.dbPassword);
module.exports = {
    development: {
        username: USER,
        password: PASSWORD,
        database: config_1.default.dbName,
        host: config_1.default.dbHost,
        dialect: "mysql",
    },
    production: {
        username: USER,
        password: PASSWORD,
        database: config_1.default.dbName,
        host: config_1.default.dbHost,
        dialect: "mysql",
    },
};
