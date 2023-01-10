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
const guarantor_schema_1 = __importDefault(require("../app/extrajudicial/schemas/guarantor.schema"));
const guarantor_service_1 = __importDefault(require("../app/extrajudicial/services/guarantor.service"));
const { getGuarantorByClientIDSchema, getGuarantorByIDSchema, createGuarantorSchema, updateGuarantorSchema, } = guarantor_schema_1.default;
const router = express_1.default.Router();
const service = new guarantor_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guarantors = yield service.findAll();
        res.json(guarantors);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/all-client/:clientId", (0, validator_handler_1.default)(getGuarantorByClientIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const guarantors = yield service.findAllByClient(clientId);
        res.json(guarantors);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, validator_handler_1.default)(getGuarantorByIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const guarantor = yield service.findByID(id);
        res.json(guarantor);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createGuarantorSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newGuarantor = yield service.create(body);
        res.status(201).json(newGuarantor);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/:id", (0, validator_handler_1.default)(getGuarantorByIDSchema, "params"), (0, validator_handler_1.default)(updateGuarantorSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const guarantor = yield service.update(id, body);
        res.json(guarantor);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(getGuarantorByIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
