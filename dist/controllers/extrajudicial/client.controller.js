"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteClientController = exports.transferClientToAnotherBankController = exports.updateClientsController = exports.saveClientController = exports.getClientByCodeCHBController = exports.getClientsByCHBDetailsController = exports.getClientsByNameOrCodeController = exports.getClientsByCHBController = exports.downloadExcelDailyManagementController = exports.getAllClientsController = void 0;
const client_service_1 = __importDefault(require("../../app/extrajudicial/services/client.service"));
const fs = __importStar(require("fs"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const city_model_1 = __importDefault(require("../../db/models/city.model"));
const client_model_1 = __importDefault(require("../../db/models/client.model"));
const service = new client_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { CITY_TABLE } = city_model_1.default;
const { CLIENT_TABLE } = client_model_1.default;
const getAllClientsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield service.findAll();
        res.json(clients);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllClientsController = getAllClientsController;
const downloadExcelDailyManagementController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { date, cityId } = req.query;
        const newDate = date;
        const newCityId = cityId;
        const filePath = yield service.readAndUpdateExcelFile(newDate, newCityId);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P02-01",
            entity: CITY_TABLE,
            entityId: Number(cityId),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.sendFile(filePath, (err) => {
            if (err) {
                next(err);
            }
            else {
                fs.unlinkSync(filePath);
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.downloadExcelDailyManagementController = downloadExcelDailyManagementController;
const getClientsByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const { clients, quantity } = yield service.findAllCHB(chb, req.query);
        res.json({ clients, quantity });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getClientsByCHBController = getClientsByCHBController;
const getClientsByNameOrCodeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const clients = yield service.findByNameOrCode(chb, req.query);
        res.json(clients);
    }
    catch (error) {
        next(error);
    }
});
exports.getClientsByNameOrCodeController = getClientsByNameOrCodeController;
const getClientsByCHBDetailsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const clients = yield service.findAllCHBDetails(chb);
        res.json(clients);
    }
    catch (error) {
        next(error);
    }
});
exports.getClientsByCHBDetailsController = getClientsByCHBDetailsController;
const getClientByCodeCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, chb } = req.params;
        const client = yield service.findCode(code, chb);
        res.json(client);
    }
    catch (error) {
        next(error);
    }
});
exports.getClientByCodeCHBController = getClientByCodeCHBController;
const saveClientController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const body = req.body;
        const permission = body.id === 0 ? "P02-03" : "P02-04";
        const client = yield service.save(body, Number(req.params.idCustomer), req.user);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: permission,
            entity: CLIENT_TABLE,
            entityId: Number(client.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json(client);
    }
    catch (error) {
        next(error);
    }
});
exports.saveClientController = saveClientController;
const updateClientsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const body = req.body;
        const clients = yield service.updateClients(body.clients, chb);
        body.clients.forEach((client) => __awaiter(void 0, void 0, void 0, function* () {
            var _g, _h, _j;
            yield serviceUserLog.create({
                customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
                codeAction: "P02-04",
                entity: CLIENT_TABLE,
                entityId: Number(client.id),
                ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
                customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            });
        }));
        res.status(201).json(clients);
    }
    catch (error) {
        next(error);
    }
});
exports.updateClientsController = updateClientsController;
const transferClientToAnotherBankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { chb } = req.params;
        const body = req.body;
        const data = yield service.transferToAnotherBank(body.code, chb, body.chbTransferred);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P02-06",
            entity: CLIENT_TABLE,
            entityId: Number(body.code),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
        });
        res.status(201).json({ id: data.id, chbTransferred: data.chbTransferred });
    }
    catch (error) {
        next(error);
    }
});
exports.transferClientToAnotherBankController = transferClientToAnotherBankController;
const deleteClientController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q;
    try {
        const { code, chb, idCustomer } = req.params;
        const client = yield service.delete(code, chb, Number(idCustomer));
        yield serviceUserLog.create({
            customerUserId: Number((_o = req.user) === null || _o === void 0 ? void 0 : _o.id),
            codeAction: "P02-05",
            entity: CLIENT_TABLE,
            entityId: Number(client.id),
            ip: (_p = req.clientIp) !== null && _p !== void 0 ? _p : "",
            customerId: Number((_q = req.user) === null || _q === void 0 ? void 0 : _q.customerId),
        });
        res.status(201).json({ code, chb, id: client.id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteClientController = deleteClientController;
