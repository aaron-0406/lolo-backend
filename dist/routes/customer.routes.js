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
const customer_service_1 = __importDefault(require("../app/customers/services/customer.service"));
const customer_schema_1 = __importDefault(require("../app/customers/schemas/customer.schema"));
const { getCustomerByUrlSchema, createCustomerSchema } = customer_schema_1.default;
const router = express_1.default.Router();
const service = new customer_service_1.default();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield service.find();
        res.json(customers);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:urlIdentifier", (0, validator_handler_1.default)(getCustomerByUrlSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { urlIdentifier } = req.params;
        const customer = yield service.findOne(urlIdentifier);
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createCustomerSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newCustomer = yield service.create(body);
        res.status(201).json(newCustomer);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
