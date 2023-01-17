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
const negotiation_schema_1 = __importDefault(require("../app/boss/schemas/negotiation.schema"));
const negotiation_service_1 = __importDefault(require("../app/boss/services/negotiation.service"));
const { getNegotiationSchema, getNegotiationByCHBSchema, createNegotiationSchema, updateNegotiationSchema, } = negotiation_schema_1.default;
const router = express_1.default.Router();
const service = new negotiation_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const negotiations = yield service.findAll();
        res.json(negotiations);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/all/:chb", (0, validator_handler_1.default)(getNegotiationByCHBSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const negotiations = yield service.findAllByCHB(chb);
        res.json(negotiations);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, validator_handler_1.default)(getNegotiationSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const negotiation = yield service.findOne(id);
        res.json(negotiation);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createNegotiationSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newNegotiation = yield service.create(body);
        res.status(201).json(newNegotiation);
    }
    catch (error) {
        next(error);
    }
}));
router.put("/:id", (0, validator_handler_1.default)(getNegotiationSchema, "params"), (0, validator_handler_1.default)(updateNegotiationSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const negotiation = yield service.update(id, body);
        res.json(negotiation);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(getNegotiationSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
