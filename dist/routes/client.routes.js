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
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const client_schema_1 = __importDefault(require("../app/extrajudicial/schemas/client.schema"));
const client_service_1 = __importDefault(require("../app/extrajudicial/services/client.service"));
const { getClientByCHBSchema, getClientByCodeSchema, createClientSchema, updateClientSchema, getClientByCustomer, deleteClientByCodeSchema, getClientByCHBSchemaQuery, getDateSchema, } = client_schema_1.default;
const router = express_1.default.Router();
const service = new client_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield service.findAll();
        res.json(clients);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/download-excel-daily-management", (0, validator_handler_1.default)(getDateSchema, "query"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        const newDate = date;
        const filePath = yield service.readAndUpdateExcelFile(newDate);
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
}));
router.get("/:chb", (0, validator_handler_1.default)(getClientByCHBSchema, "params"), (0, validator_handler_1.default)(getClientByCHBSchemaQuery, "query"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const { clients, quantity } = yield service.findAllCHB(chb, req.query);
        res.json({ clients, quantity });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:chb/details", (0, validator_handler_1.default)(getClientByCHBSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const clients = yield service.findAllCHBDetails(chb);
        res.json(clients);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:code/:chb", (0, validator_handler_1.default)(getClientByCodeSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, chb } = req.params;
        const client = yield service.findCode(code, chb);
        res.json(client);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/:idCustomer", (0, validator_handler_1.default)(getClientByCustomer, "params"), (0, validator_handler_1.default)(createClientSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newClient = yield service.create(body, Number(req.params.idCustomer));
        res.status(201).json(newClient);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/:code/:chb", (0, validator_handler_1.default)(getClientByCodeSchema, "params"), (0, validator_handler_1.default)(updateClientSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, chb } = req.params;
        const body = req.body;
        const client = yield service.update(code, chb, body);
        res.json(client);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:code/:chb/:idCustomer", (0, validator_handler_1.default)(deleteClientByCodeSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, chb, idCustomer } = req.params;
        yield service.delete(code, chb, Number(idCustomer));
        res.status(201).json({ code, chb });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
