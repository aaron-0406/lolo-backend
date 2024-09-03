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
exports.deleteTariffController = exports.updateTariffController = exports.createTariffController = exports.getTariffsController = void 0;
const tariff_service_1 = __importDefault(require("../../app/settings/services/tariff.service"));
const service = new tariff_service_1.default();
const getTariffsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chb } = req.params;
    const data = yield service.findAll(Number(chb));
    res.status(200).json(data);
});
exports.getTariffsController = getTariffsController;
const createTariffController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service.create(req.body);
    res.status(200).json(data);
});
exports.createTariffController = createTariffController;
const updateTariffController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield service.update(Number(id), req.body);
    res.status(200).json(data);
});
exports.updateTariffController = updateTariffController;
const deleteTariffController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield service.delete(id);
    res.status(200).json(data);
});
exports.deleteTariffController = deleteTariffController;
