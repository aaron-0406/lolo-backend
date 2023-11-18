"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getClientIp = (req) => {
    const clientIP = (req.headers["x-forwarded-for"] || req.ip || "");
    return clientIP.split(",")[1].trim();
};
const ipHandler = (req, res, next) => {
    req.clientIp = getClientIp(req);
    next();
};
exports.default = ipHandler;
