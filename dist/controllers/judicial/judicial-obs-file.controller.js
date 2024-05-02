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
exports.deleteJudicialObsFileController = exports.findFileByIdController = void 0;
const judicial_obs_file_service_1 = __importDefault(require("../../app/judicial/services/judicial-obs-file.service"));
const service = new judicial_obs_file_service_1.default();
const findFileByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, idCustomer, chb, code, judicialFileCaseId } = req.params;
        const file = yield service.findOne(Number(idCustomer), Number(chb), code, Number(judicialFileCaseId), Number(id));
        res.json(file);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.findFileByIdController = findFileByIdController;
const deleteJudicialObsFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, idCustomer, chb, code, judicialFileCaseId } = req.params;
        yield service.delete(id, Number(idCustomer), Number(chb), code, Number(judicialFileCaseId));
        res.status(201).json({ id: Number(id) });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialObsFileController = deleteJudicialObsFileController;
