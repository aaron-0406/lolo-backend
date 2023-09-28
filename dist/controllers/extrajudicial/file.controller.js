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
exports.deleteFileController = exports.createFileController = exports.findFileByIdController = exports.findFileByClientIdController = void 0;
const file_service_1 = __importDefault(require("../../app/extrajudicial/services/file.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const file_model_1 = __importDefault(require("../../db/models/file.model"));
const service = new file_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { FILE_TABLE } = file_model_1.default;
const findFileByClientIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const files = yield service.find(Number(id));
        res.json(files);
    }
    catch (error) {
        next(error);
    }
});
exports.findFileByClientIdController = findFileByClientIdController;
const findFileByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id, idCustomer, code, chb } = req.params;
        const file = yield service.findOne(Number(idCustomer), Number(chb), Number(code), Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P03-06-01",
            entity: FILE_TABLE,
            entityId: Number(id),
            ip: req.ip,
            customerId: Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.customerId),
        });
        res.json(file);
    }
    catch (error) {
        next(error);
    }
});
exports.findFileByIdController = findFileByIdController;
const createFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        req.body.clientId = Number(req.params.id);
        req.body.idCustomer = Number(req.params.idCustomer);
        req.body.code = Number(req.params.code);
        req.body.chb = Number(req.params.chb);
        req.body.files = req.files;
        const { body } = req;
        const newFile = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.id),
            codeAction: "P03-06-02",
            entity: FILE_TABLE,
            entityId: 0,
            ip: req.ip,
            customerId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.customerId),
        });
        res.status(201).json(newFile);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createFileController = createFileController;
const deleteFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const { id, code, idCustomer, chb } = req.params;
        yield service.delete(Number(idCustomer), Number(chb), Number(code), Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.id),
            codeAction: "P03-06-03",
            entity: FILE_TABLE,
            entityId: Number(id),
            ip: req.ip,
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFileController = deleteFileController;
