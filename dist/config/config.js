"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    env: process.env.NODE_ENV || "dev",
    port: process.env.PORT || 5000,
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_PUBLIC_KEY: `${process.env.AWS_PUBLIC_KEY}`,
    AWS_SECRET_KEY: `${process.env.AWS_SECRET_KEY}`,
    AWS_BANK_PATH: "BANCOS/",
    AWS_PLANTILLA_PATH: "PLANTILLAS/",
};
exports.default = config;
