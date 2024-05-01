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
exports.deleteExtContactTypeController = exports.updateExtContactTypeController = exports.createExtContactTypeController = exports.getExtContactTypeByIdController = exports.getExtContactTypeByCHBController = exports.getExtContactTypeController = void 0;
const ext_contact_type_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-contact-type.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const ext_contact_type_model_1 = __importDefault(require("../../db/models/ext-contact-type.model"));
const service = new ext_contact_type_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_CONTACT_TYPE_TABLE } = ext_contact_type_model_1.default;
const getExtContactTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extContactTypes = yield service.findAll();
        res.json(extContactTypes);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtContactTypeController = getExtContactTypeController;
const getExtContactTypeByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { chb } = req.params;
        const extContactTypes = yield service.findAllByCHB(chb);
        const { visible } = req.query;
        if (visible === "true") {
            yield serviceUserLog.create({
                customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
                codeAction: "P18-04",
                entity: EXT_CONTACT_TYPE_TABLE,
                entityId: Number(chb),
                ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
                customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            });
        }
        res.json(extContactTypes);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtContactTypeByCHBController = getExtContactTypeByCHBController;
const getExtContactTypeByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const extContactType = yield service.findByID(id);
        res.json(extContactType);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtContactTypeByIdController = getExtContactTypeByIdController;
const createExtContactTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const body = req.body;
        const newExtContactType = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P18-01",
            entity: EXT_CONTACT_TYPE_TABLE,
            entityId: Number(newExtContactType.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json(newExtContactType);
    }
    catch (error) {
        next(error);
    }
});
exports.createExtContactTypeController = createExtContactTypeController;
const updateExtContactTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const extContactType = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P18-02",
            entity: EXT_CONTACT_TYPE_TABLE,
            entityId: Number(extContactType.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(extContactType);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExtContactTypeController = updateExtContactTypeController;
const deleteExtContactTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P18-03",
            entity: EXT_CONTACT_TYPE_TABLE,
            entityId: Number(id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteExtContactTypeController = deleteExtContactTypeController;
