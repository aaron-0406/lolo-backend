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
exports.deletedUseOfPropertyController = exports.updateUseOfPropertyController = exports.createUseOfPropertyController = exports.findAllUseOfPropertiesByCHBController = exports.findUseOfPropertyByIdController = void 0;
const judicial_use_of_property_model_1 = __importDefault(require("../../db/models/judicial-use-of-property.model"));
const judicial_use_of_property_service_1 = __importDefault(require("../../app/judicial/services/judicial-use-of-property.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const service = new judicial_use_of_property_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_USE_OF_PROPERTY_TABLE } = judicial_use_of_property_model_1.default;
const findUseOfPropertyByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const useOfProperty = yield service.findByID(id);
        res.json(useOfProperty);
    }
    catch (error) {
        next(error);
    }
});
exports.findUseOfPropertyByIdController = findUseOfPropertyByIdController;
const findAllUseOfPropertiesByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const useOfProperties = yield service.findAllByCHB(parseInt(chb));
        res.json(useOfProperties);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllUseOfPropertiesByCHBController = findAllUseOfPropertiesByCHBController;
const createUseOfPropertyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newUseOfProperty = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P38-01",
            entity: JUDICIAL_USE_OF_PROPERTY_TABLE,
            entityId: Number(newUseOfProperty.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(newUseOfProperty);
    }
    catch (error) {
        next(error);
    }
});
exports.createUseOfPropertyController = createUseOfPropertyController;
const updateUseOfPropertyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const useOfProperty = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P38-02",
            entity: JUDICIAL_USE_OF_PROPERTY_TABLE,
            entityId: Number(useOfProperty.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(useOfProperty);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUseOfPropertyController = updateUseOfPropertyController;
const deletedUseOfPropertyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const useOfProperty = yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P38-03",
            entity: JUDICIAL_USE_OF_PROPERTY_TABLE,
            entityId: Number(useOfProperty.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(useOfProperty);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedUseOfPropertyController = deletedUseOfPropertyController;
