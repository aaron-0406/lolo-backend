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
exports.deleteProductController = exports.changeProductController = exports.updateProductController = exports.createProductController = exports.getProductsByCustomerIdController = exports.getProductByCodeController = exports.getProductsByClientCodeController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const product_service_1 = __importDefault(require("../../app/extrajudicial/services/product.service"));
const service = new product_service_1.default();
const getProductsByClientCodeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const products = yield service.getByClientCode(code);
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.getProductsByClientCodeController = getProductsByClientCodeController;
const getProductByCodeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const product = yield service.getByProductCode(code);
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.getProductByCodeController = getProductByCodeController;
const getProductsByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const products = yield service.getAllByCustomerId(Number(customerId));
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.getProductsByCustomerIdController = getProductsByCustomerIdController;
const createProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield service.create(req.body);
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.createProductController = createProductController;
const updateProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.update(req.body, Number(id));
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.updateProductController = updateProductController;
const changeProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.change(req.body, Number(id));
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.changeProductController = changeProductController;
const deleteProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(Number(id));
        res.json(Number(id));
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.deleteProductController = deleteProductController;
