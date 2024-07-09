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
exports.getAllDistrictsByProvinceController = exports.getDistrictsController = void 0;
const district_service_1 = __importDefault(require("../../app/settings/services/district.service"));
const service = new district_service_1.default();
const getDistrictsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service.findAll();
    res.status(200).json(data);
});
exports.getDistrictsController = getDistrictsController;
const getAllDistrictsByProvinceController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { provinceId } = req.params;
    const data = yield service.findAllByProvince(provinceId);
    res.status(200).json(data);
});
exports.getAllDistrictsByProvinceController = getAllDistrictsByProvinceController;