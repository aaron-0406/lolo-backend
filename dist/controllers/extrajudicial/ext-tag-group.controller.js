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
exports.deleteExtTagGroupController = exports.updateExtTagGroupController = exports.createExtTagGroupController = exports.getExtTagGroupByIdController = exports.getExtTagGroupByCHBController = exports.getExtTagGroupController = void 0;
const ext_tag_group_service_1 = __importDefault(require("../../app/extrajudicial/services/ext-tag-group.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const ext_tag_group_model_1 = __importDefault(require("../../db/models/ext-tag-group.model"));
const service = new ext_tag_group_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { EXT_TAG_GROUP_TABLE } = ext_tag_group_model_1.default;
const getExtTagGroupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extTagGroups = yield service.findAll();
        res.json(extTagGroups);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtTagGroupController = getExtTagGroupController;
const getExtTagGroupByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const extTagGroups = yield service.findAllByCHB(chb);
        res.json(extTagGroups);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtTagGroupByCHBController = getExtTagGroupByCHBController;
const getExtTagGroupByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const extTagGroup = yield service.findByID(id);
        res.json(extTagGroup);
    }
    catch (error) {
        next(error);
    }
});
exports.getExtTagGroupByIdController = getExtTagGroupByIdController;
const createExtTagGroupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newExtTagGroup = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P02-02-07-01",
            entity: EXT_TAG_GROUP_TABLE,
            entityId: Number(newExtTagGroup.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newExtTagGroup);
    }
    catch (error) {
        next(error);
    }
});
exports.createExtTagGroupController = createExtTagGroupController;
const updateExtTagGroupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const extTagGroup = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P02-02-07-02",
            entity: EXT_TAG_GROUP_TABLE,
            entityId: Number(extTagGroup.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(extTagGroup);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExtTagGroupController = updateExtTagGroupController;
const deleteExtTagGroupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P02-02-07-03",
            entity: EXT_TAG_GROUP_TABLE,
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
exports.deleteExtTagGroupController = deleteExtTagGroupController;
