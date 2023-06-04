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
const management_action_schema_1 = __importDefault(require("../app/boss/schemas/management-action.schema"));
const management_action_service_1 = __importDefault(require("../app/boss/services/management-action.service"));
const { getManagementActionSchema, getManagementActionByCHBSchema, createManagementActionSchema, updateManagementActionSchema, } = management_action_schema_1.default;
const router = express_1.default.Router();
const service = new management_action_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const managementActions = yield service.findAll();
        res.json(managementActions);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/all/:chb", (0, validator_handler_1.default)(getManagementActionByCHBSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const managementActions = yield service.findAllByCHB(chb);
        res.json(managementActions);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, validator_handler_1.default)(getManagementActionSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const managementAction = yield service.findOne(id);
        res.json(managementAction);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createManagementActionSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newManagementAction = yield service.create(body);
        res.status(201).json(newManagementAction);
    }
    catch (error) {
        next(error);
    }
}));
router.put("/:id", (0, validator_handler_1.default)(getManagementActionSchema, "params"), (0, validator_handler_1.default)(updateManagementActionSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const managementAction = yield service.update(id, body);
        res.json(managementAction);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(getManagementActionSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
