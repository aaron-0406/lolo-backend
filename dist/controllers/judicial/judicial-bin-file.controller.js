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
exports.deleteJudicialBinFileController = exports.updateJudicialBinFileController = exports.createJudicialBinFileController = exports.getJudicialBinFileByIdController = exports.getJudicialBinFileByCHBController = void 0;
const judicial_bin_file_service_1 = __importDefault(require("../../app/judicial/services/judicial-bin-file.service"));
const service = new judicial_bin_file_service_1.default();
const getJudicialBinFileByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const judicialBinFiles = yield service.findAllByCHB(Number(chb));
        res.json(judicialBinFiles);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinFileByCHBController = getJudicialBinFileByCHBController;
const getJudicialBinFileByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const judicialBinFile = yield service.findByID(id);
        res.json(judicialBinFile);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialBinFileByIdController = getJudicialBinFileByIdController;
const createJudicialBinFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newJudicialBinFile = yield service.create(body);
        res.status(201).json(newJudicialBinFile);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialBinFileController = createJudicialBinFileController;
const updateJudicialBinFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const judicialBinFile = yield service.update(id, body);
        res.json(judicialBinFile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialBinFileController = updateJudicialBinFileController;
const deleteJudicialBinFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialBinFileController = deleteJudicialBinFileController;
