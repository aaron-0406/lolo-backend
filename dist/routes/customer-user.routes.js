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
const customer_user_schema_1 = __importDefault(require("../app/customers/schemas/customer-user.schema"));
const customer_user_service_1 = __importDefault(require("../app/customers/services/customer-user.service"));
const { getCustomerUserSchema, getCustomerUserByIdSchema, createCustomerUserSchema, updateCustomerUserSchema, updateCustomerUserStateSchema, } = customer_user_schema_1.default;
const router = express_1.default.Router();
const service = new customer_user_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield service.findAll();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/users/:customerId", (0, validator_handler_1.default)(getCustomerUserByIdSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const users = yield service.findAllByCustomerID(customerId);
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, validator_handler_1.default)(getCustomerUserSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield service.findOne(id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createCustomerUserSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newUser = yield service.create(body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/state/:id", (0, validator_handler_1.default)(getCustomerUserSchema, "params"), (0, validator_handler_1.default)(updateCustomerUserStateSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = yield service.updateState(id, body);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/:id", (0, validator_handler_1.default)(getCustomerUserSchema, "params"), (0, validator_handler_1.default)(updateCustomerUserSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = yield service.update(id, body);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(getCustomerUserSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
