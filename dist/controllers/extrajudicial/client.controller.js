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
exports.deleteClientController = exports.updateClientController = exports.createClientController = exports.getClientByCodeCHBController = exports.getClientsByCHBDetailsController = exports.getClientsByNameController = exports.getClientsByCHBController = exports.downloadExcelDailyManagementController = exports.getAllClientsController = void 0;
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
    var _a, _b;
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
            ip: req.ip,
            customerId: Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.customerId),
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
        next(error);
    }
});
exports.getClientsByCHBController = getClientsByCHBController;
const getClientsByNameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const clients = yield service.findByName(chb, req.query);
        res.json(clients);
    }
    catch (error) {
        next(error);
    }
});
exports.getClientsByNameController = getClientsByNameController;
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
const createClientController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const body = req.body;
        const newClient = yield service.create(body, Number(req.params.idCustomer));
        yield serviceUserLog.create({
            customerUserId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.id),
            codeAction: "P03-02",
            entity: CLIENT_TABLE,
            entityId: Number(newClient.dataValues.id),
            ip: req.ip,
            customerId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.customerId),
        });
        res.status(201).json(newClient);
    }
    catch (error) {
        next(error);
    }
});
exports.createClientController = createClientController;
const updateClientController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const { code, chb } = req.params;
        const body = req.body;
        const client = yield service.update(code, chb, body);
        yield serviceUserLog.create({
            customerUserId: Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.id),
            codeAction: "P03-03",
            entity: CLIENT_TABLE,
            entityId: Number(client.dataValues.id),
            ip: req.ip,
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(client);
    }
    catch (error) {
        next(error);
    }
});
exports.updateClientController = updateClientController;
const deleteClientController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const { code, chb, idCustomer } = req.params;
        const client = yield service.delete(code, chb, Number(idCustomer));
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P03-04",
            entity: CLIENT_TABLE,
            entityId: Number(client.id),
            ip: req.ip,
            customerId: Number((_h = req.user) === null || _h === void 0 ? void 0 : _h.customerId),
        });
        res.status(201).json({ code, chb });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteClientController = deleteClientController;
