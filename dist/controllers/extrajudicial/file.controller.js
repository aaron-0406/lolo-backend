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
exports.deleteFileController = exports.updateFileController = exports.createFileController = exports.findFileByIdController = exports.findFileByClientIdController = void 0;
const file_service_1 = __importDefault(require("../../app/extrajudicial/services/file.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const file_model_1 = __importDefault(require("../../db/models/file.model"));
const service = new file_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { FILE_TABLE } = file_model_1.default;
const findFileByClientIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, chb } = req.params;
        const query = req.query;
        const files = yield service.find(Number(id), Number(chb), query);
        res.json(files);
    }
    catch (error) {
        next(error);
    }
});
exports.findFileByClientIdController = findFileByClientIdController;
const findFileByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { id, idCustomer, code, chb } = req.params;
        const file = yield service.findOne(Number(idCustomer), Number(chb), Number(code), Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P02-02-03-01",
            entity: FILE_TABLE,
            entityId: Number(id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(file);
    }
    catch (error) {
        next(error);
    }
});
exports.findFileByIdController = findFileByIdController;
const createFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        req.body.clientId = Number(req.params.id);
        req.body.idCustomer = Number(req.params.idCustomer);
        req.body.code = Number(req.params.code);
        req.body.chb = Number(req.params.chb);
        req.body.tagId = Number(req.params.tagId);
        req.body.files = req.files;
        const { body } = req;
        const newFile = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P02-02-03-02",
            entity: FILE_TABLE,
            entityId: 0,
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json(newFile);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createFileController = createFileController;
const updateFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const file = yield service.updateFile(id, body.originalName, body.tagId);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P02-02-03-04",
            entity: FILE_TABLE,
            entityId: Number(file.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(file);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateFileController = updateFileController;
const deleteFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id, code, idCustomer, chb } = req.params;
        yield service.delete(Number(idCustomer), Number(chb), Number(code), Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P02-02-03-03",
            entity: FILE_TABLE,
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
exports.deleteFileController = deleteFileController;
