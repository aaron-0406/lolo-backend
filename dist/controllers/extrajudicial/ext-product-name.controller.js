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
exports.deleteExtProductNameController = exports.updateExtProductNameController = exports.createExtProductNameController = exports.getExtProductNameByIdController = exports.getExtProductNameByCHBController = exports.getExtProductNameController = void 0;
const ext_product_name_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-product-name.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const ext_product_name_model_1 = __importDefault(require("../../db/models/ext-product-name.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new ext_product_name_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_PRODUCT_NAME_TABLE } = ext_product_name_model_1.default;
const getExtProductNameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extProductsName = yield service.findAll();
        res.json(extProductsName);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtProductNameController = getExtProductNameController;
const getExtProductNameByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { chb } = req.params;
        const extProductsName = yield service.findAllByCHB(chb);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P19-04",
                entity: EXT_PRODUCT_NAME_TABLE,
                entityId: Number(chb),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.json(extProductsName);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtProductNameByCHBController = getExtProductNameByCHBController;
const getExtProductNameByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const extProductName = yield service.findByID(id);
        res.json(extProductName);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtProductNameByIdController = getExtProductNameByIdController;
const createExtProductNameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const body = req.body;
        const newExtProductName = yield service.create(body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newExtProductName.dataValues.id,
            newData: newExtProductName.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P19-01",
            entity: EXT_PRODUCT_NAME_TABLE,
            entityId: Number(newExtProductName.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newExtProductName);
    }
    catch (error) {
        next(error);
    }
});
exports.createExtProductNameController = createExtProductNameController;
const updateExtProductNameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldProductName, newProductName } = yield service.update(id, body);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: newProductName.dataValues.id,
            oldData: oldProductName,
            newData: newProductName.dataValues,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P19-02",
            entity: EXT_PRODUCT_NAME_TABLE,
            entityId: Number(newProductName.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.json(newProductName);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExtProductNameController = updateExtProductNameController;
const deleteExtProductNameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        const oldProductName = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            id: id,
            oldData: oldProductName,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P19-03",
            entity: EXT_PRODUCT_NAME_TABLE,
            entityId: Number(id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
            methodSumary: sumary,
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteExtProductNameController = deleteExtProductNameController;
