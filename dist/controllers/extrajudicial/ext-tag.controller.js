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
exports.deleteExtTagController = exports.updateExtTagActionController = exports.updateExtTagController = exports.createExtTagController = exports.getExtTagByIdController = exports.getExtTagsByCHBAndTagGroupIdController = exports.getExtTagsByCHBController = exports.getExtTagsController = void 0;
const ext_tag_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-tag.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const ext_tag_model_1 = __importDefault(require("../../db/models/ext-tag.model"));
const service = new ext_tag_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_TAG_TABLE } = ext_tag_model_1.default;
const getExtTagsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extTags = yield service.findAll();
        res.json(extTags);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtTagsController = getExtTagsController;
const getExtTagsByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const extTags = yield service.findAllByCHB(chb);
        res.json(extTags);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtTagsByCHBController = getExtTagsByCHBController;
const getExtTagsByCHBAndTagGroupIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb, tagGroupId } = req.params;
        const extTags = yield service.findAllByCHBAndTagGroupId(chb, tagGroupId);
        res.json(extTags);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtTagsByCHBAndTagGroupIdController = getExtTagsByCHBAndTagGroupIdController;
const getExtTagByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const extTag = yield service.findByID(id);
        res.json(extTag);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtTagByIdController = getExtTagByIdController;
const createExtTagController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newExtTag = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P14-01",
            entity: EXT_TAG_TABLE,
            entityId: Number(newExtTag.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newExtTag);
    }
    catch (error) {
        next(error);
    }
});
exports.createExtTagController = createExtTagController;
const updateExtTagController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const extTag = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P14-02",
            entity: EXT_TAG_TABLE,
            entityId: Number(extTag.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(extTag);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExtTagController = updateExtTagController;
const updateExtTagActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const extTag = yield service.updateAction(id, body.action);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P14-02",
            entity: EXT_TAG_TABLE,
            entityId: Number(extTag.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(extTag);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExtTagActionController = updateExtTagActionController;
const deleteExtTagController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P14-03",
            entity: EXT_TAG_TABLE,
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
exports.deleteExtTagController = deleteExtTagController;
