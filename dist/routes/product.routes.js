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
const express_1 = require("express");
const product_schema_1 = require("../app/customers/schemas/product.schema");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const boom_1 = __importDefault(require("@hapi/boom"));
const product_service_1 = __importDefault(require("../app/customers/services/product.service"));
const router = (0, express_1.Router)();
const service = new product_service_1.default();
router.get("/client/:code", (0, validator_handler_1.default)(product_schema_1.getProductsByClientCodeSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const products = yield service.getByClientCode(code);
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
router.get("/single/:code", (0, validator_handler_1.default)(product_schema_1.getProductByCodeSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const product = yield service.getByProductCode(code);
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
router.get("/:customerId", (0, validator_handler_1.default)(product_schema_1.getProductsByCustomerIdSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const products = yield service.getAllByCustomerId(Number(customerId));
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
router.post("/", (0, validator_handler_1.default)(product_schema_1.createProductSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield service.create(req.body);
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
router.put("/:id", (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), (0, validator_handler_1.default)(product_schema_1.updateProductSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.update(req.body, Number(id));
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
router.patch("/:id", (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), (0, validator_handler_1.default)(product_schema_1.changeProductSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.change(req.body, Number(id));
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(product_schema_1.getProductByIdSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(Number(id));
        res.json(Number(id));
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
exports.default = router;
