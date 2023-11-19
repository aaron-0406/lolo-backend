"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getClientIp = (req) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    const clientIP = forwardedFor
        ? forwardedFor.split(",")[0].trim()
        : req.ip || "";
    const ipv4Address = extractIPv4(clientIP);
    return ipv4Address || "";
};
const extractIPv4 = (ip) => {
    const ipv4Regex = /(\d+\.\d+\.\d+\.\d+)/;
    const match = ip.match(ipv4Regex);
    return match ? match[0] : null;
};
const ipHandler = (req, res, next) => {
    req.clientIp = getClientIp(req);
    next();
};
exports.default = ipHandler;
