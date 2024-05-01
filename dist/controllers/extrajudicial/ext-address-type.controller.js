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
exports.deleteAddressTypeController = exports.updateAddressTypeController = exports.createAddressTypeController = exports.getAddressTypeByIdController = exports.getAddressTypeByCHBController = exports.getAllAddressTypesController = void 0;
const ext_address_type_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-address-type.service"));
const ext_address_type_model_1 = __importDefault(require("../../db/models/ext-address-type.model"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const service = new ext_address_type_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_ADDRESS_TYPE_TABLE } = ext_address_type_model_1.default;
const getAllAddressTypesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield service.findAll();
        res.json(address);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAddressTypesController = getAllAddressTypesController;
const getAddressTypeByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const address = yield service.findAllByChb(chb);
        res.json(address);
    }
    catch (error) {
        next(error);
    }
});
exports.getAddressTypeByCHBController = getAddressTypeByCHBController;
const getAddressTypeByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, chb } = req.params;
        const address = yield service.findByID(id, chb);
        res.json(address);
    }
    catch (error) {
        next(error);
    }
});
exports.getAddressTypeByIdController = getAddressTypeByIdController;
const createAddressTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newAddress = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P16-01",
            entity: EXT_ADDRESS_TYPE_TABLE,
            entityId: Number(newAddress.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newAddress);
    }
    catch (error) {
        next(error);
    }
});
exports.createAddressTypeController = createAddressTypeController;
const updateAddressTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const direction = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P16-02",
            entity: EXT_ADDRESS_TYPE_TABLE,
            entityId: Number(direction.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(direction);
    }
    catch (error) {
        next(error);
    }
});
exports.updateAddressTypeController = updateAddressTypeController;
const deleteAddressTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id, chb } = req.params;
        yield service.delete(id, chb);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P16-03",
            entity: EXT_ADDRESS_TYPE_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAddressTypeController = deleteAddressTypeController;
