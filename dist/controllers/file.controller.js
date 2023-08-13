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
const file_service_1 = __importDefault(require("../app/customers/services/file.service"));
const service = new file_service_1.default();
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
    try {
        const { id, idCustomer, code, chb } = req.params;
        const file = yield service.findOne(Number(idCustomer), Number(chb), Number(code), Number(id));
        res.json(file);
    }
    catch (error) {
        next(error);
    }
});
exports.findFileByIdController = findFileByIdController;
const createFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.clientId = Number(req.params.id);
        req.body.idCustomer = Number(req.params.idCustomer);
        req.body.code = Number(req.params.code);
        req.body.chb = Number(req.params.chb);
        req.body.files = req.files;
        const { body } = req;
        const newFile = yield service.create(body);
        res.status(201).json(newFile);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createFileController = createFileController;
const deleteFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, code, idCustomer, chb } = req.params;
        yield service.delete(Number(idCustomer), Number(chb), Number(code), Number(id));
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFileController = deleteFileController;
