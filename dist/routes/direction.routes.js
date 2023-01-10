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
const direction_schema_1 = __importDefault(require("../app/extrajudicial/schemas/direction.schema"));
const direction_service_1 = __importDefault(require("../app/extrajudicial/services/direction.service"));
const { createDirectionSchema, updateDirectionSchema, getDirectionByClientIDSchema, getDirectionByIDSchema, } = direction_schema_1.default;
const router = express_1.default.Router();
const service = new direction_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const directions = yield service.findAll();
        res.json(directions);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/all-client/:clientId", (0, validator_handler_1.default)(getDirectionByClientIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const directions = yield service.findAllByClient(clientId);
        res.json(directions);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, validator_handler_1.default)(getDirectionByIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const direction = yield service.findByID(id);
        res.json(direction);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createDirectionSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newDirection = yield service.create(body);
        res.status(201).json(newDirection);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/:id", (0, validator_handler_1.default)(getDirectionByIDSchema, "params"), (0, validator_handler_1.default)(updateDirectionSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const direction = yield service.update(id, body);
        res.json(direction);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(getDirectionByIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
