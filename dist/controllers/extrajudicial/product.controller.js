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
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductsByCustomerIdController = exports.getProductByCodeController = exports.removeJudicialCaseFileFromProductController = exports.assignJudicialCaseFileToProductsController = exports.getProductsByJudicialCaseFileController = exports.getProductByIdController = exports.getProductsByClientCodeController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const product_service_1 = __importDefault(require("../../app/extrajudicial/services/product.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const product_model_1 = __importDefault(require("../../db/models/product.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new product_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { PRODUCT_TABLE } = product_model_1.default;
//INFO: CLIENTS SECTION
const getProductsByClientCodeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const products = yield service.getByClientId(Number(clientId));
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.getProductsByClientCodeController = getProductsByClientCodeController;
const getProductByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.getByProductId(parseInt(id));
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.getProductByIdController = getProductByIdController;
//INFO: JUDICIAL - CASE FILE SECTION
const getProductsByJudicialCaseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { judicialCaseFileId } = req.params;
        const products = yield service.getByJudicialCaseFileId(Number(judicialCaseFileId));
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.getProductsByJudicialCaseFileController = getProductsByJudicialCaseFileController;
const assignJudicialCaseFileToProductsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { productIds, judicialCaseFileId } = req.body;
        const products = yield service.assignJudicialCaseFileToProducts(productIds, Number(judicialCaseFileId));
        const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        const customerId = Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.customerId);
        for (const product of products) {
            const productId = Number(product.id);
            const sumary = (0, user_log_1.generateLogSummary)({
                method: req.method,
                id: productId,
                newData: product,
            });
            yield serviceUserLog.create({
                customerUserId: Number(userId),
                codeAction: "P13-01-03-02",
                entity: PRODUCT_TABLE,
                entityId: Number(productId),
                ip: (_c = req.clientIp) !== null && _c !== void 0 ? _c : "",
                customerId: Number(customerId),
                methodSumary: sumary,
            });
        }
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.assignJudicialCaseFileToProductsController = assignJudicialCaseFileToProductsController;
const removeJudicialCaseFileFromProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { productRemovedId, judicialCaseFileId } = req.body;
        const { id, oldProduct } = yield service.removeJudicialCaseFileFromProduct(productRemovedId, judicialCaseFileId);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: id,
            oldData: oldProduct,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P13-01-03-03",
            entity: PRODUCT_TABLE,
            entityId: Number(id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.json({ id });
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.removeJudicialCaseFileFromProductController = removeJudicialCaseFileFromProductController;
//INFO: DASHBOARD SECTION
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
    var _g, _h, _j;
    try {
        const product = yield service.create(req.body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: product.dataValues.id,
            newData: product.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P02-02-06-01",
            entity: PRODUCT_TABLE,
            entityId: Number(product.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.json(product);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.createProductController = createProductController;
const updateProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        const { oldProduct, productEdited } = yield service.update(req.body, Number(id));
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: productEdited.dataValues.id,
            oldData: oldProduct,
            newData: productEdited.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P02-02-06-02",
            entity: PRODUCT_TABLE,
            entityId: Number(productEdited.dataValues.id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
            methodSumary: sumary,
        });
        res.json(productEdited);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.updateProductController = updateProductController;
const deleteProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q;
    try {
        const { id } = req.params;
        const oldProduct = yield service.delete(Number(id));
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: id,
            oldData: oldProduct,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_o = req.user) === null || _o === void 0 ? void 0 : _o.id),
            codeAction: "P02-02-06-03",
            entity: PRODUCT_TABLE,
            entityId: Number(id),
            ip: (_p = req.clientIp) !== null && _p !== void 0 ? _p : "",
            customerId: Number((_q = req.user) === null || _q === void 0 ? void 0 : _q.customerId),
            methodSumary: sumary,
        });
        res.json(Number(id));
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.deleteProductController = deleteProductController;
