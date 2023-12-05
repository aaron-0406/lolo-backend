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
exports.deleteExtContactController = exports.updateExtContactController = exports.createExtContactController = exports.getExtContactByIdController = exports.getExtContactClientIdController = exports.getExtContactController = void 0;
const ext_contact_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-contact.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const ext_contacts_model_1 = __importDefault(require("../../db/models/ext-contacts.model"));
const service = new ext_contact_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_CONTACT_TABLE } = ext_contacts_model_1.default;
const getExtContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extContacts = yield service.findAll();
        res.json(extContacts);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtContactController = getExtContactController;
const getExtContactClientIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const extContacts = yield service.findAllByClient(clientId);
        res.json(extContacts);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtContactClientIdController = getExtContactClientIdController;
const getExtContactByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const extContact = yield service.findByID(id);
        res.json(extContact);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtContactByIdController = getExtContactByIdController;
const createExtContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newExtContact = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P02-02-07-01",
            entity: EXT_CONTACT_TABLE,
            entityId: Number(newExtContact.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newExtContact);
    }
    catch (error) {
        next(error);
    }
});
exports.createExtContactController = createExtContactController;
const updateExtContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const extContact = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P02-02-07-02",
            entity: EXT_CONTACT_TABLE,
            entityId: Number(extContact.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(extContact);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExtContactController = updateExtContactController;
const deleteExtContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P02-02-07-03",
            entity: EXT_CONTACT_TABLE,
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
exports.deleteExtContactController = deleteExtContactController;
