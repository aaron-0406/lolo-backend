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
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const product_model_1 = __importDefault(require("../../db/models/product.model"));
const service = new product_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { PRODUCT_TABLE } = product_model_1.default;
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
    var _a, _b, _c;
    try {
        const product = yield service.create(req.body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P02-02-06-01",
            entity: PRODUCT_TABLE,
            entityId: Number(product.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.createProductController = createProductController;
const updateProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const product = yield service.update(req.body, Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P02-02-06-02",
            entity: PRODUCT_TABLE,
            entityId: Number(product.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
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
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P02-02-06-03",
            entity: PRODUCT_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(Number(id));
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.deleteProductController = deleteProductController;
