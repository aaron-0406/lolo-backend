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
exports.sendReportByEmailController = exports.compareExcelsController = void 0;
const compare_excels_service_1 = __importDefault(require("../../app/settings/services/compare-excels.service"));
const fs_1 = __importDefault(require("fs"));
const service = new compare_excels_service_1.default();
const compareExcelsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const prevFile = files.prevFile[0];
    const newFile = files.newFile[0];
    const data = yield service.compareExcels(prevFile, newFile);
    res.status(200).json(data);
    fs_1.default.unlinkSync(prevFile.path);
    fs_1.default.unlinkSync(newFile.path);
});
exports.compareExcelsController = compareExcelsController;
const sendReportByEmailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    yield service.sendReportByEmail(data);
    res.status(200).json({ success: "Reporte enviado" });
});
exports.sendReportByEmailController = sendReportByEmailController;
