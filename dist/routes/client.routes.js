"use strict";
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
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const client_schema_1 = __importDefault(require("../app/extrajudicial/schemas/client.schema"));
const client_service_1 = __importDefault(require("../app/extrajudicial/services/client.service"));
const { getClientByCHBSchema, getClientByCodeSchema, createClientSchema, updateClientSchema, getClientByBank, deleteClientByCodeSchema, } = client_schema_1.default;
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
router.get("/:chb", (0, validator_handler_1.default)(getClientByCHBSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const clients = yield service.findAllCHB(chb);
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
router.post("/:idBank", (0, validator_handler_1.default)(getClientByBank, "params"), (0, validator_handler_1.default)(createClientSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newClient = yield service.create(body, Number(req.params.idBank));
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
router.delete("/:code/:chb/:idBank", (0, validator_handler_1.default)(deleteClientByCodeSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, chb, idBank } = req.params;
        yield service.delete(code, chb, Number(idBank));
        res.status(201).json({ code, chb });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
