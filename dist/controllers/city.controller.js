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
exports.deleteCityController = exports.updateCityController = exports.createCityController = exports.getCityByIdController = exports.getAllCityController = void 0;
const city_service_1 = __importDefault(require("../app/boss/services/city.service"));
const service = new city_service_1.default();
const getAllCityController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield service.findAll();
        res.json(cities);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCityController = getAllCityController;
const getCityByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const city = yield service.findOne(id);
        res.json(city);
    }
    catch (error) {
        next(error);
    }
});
exports.getCityByIdController = getCityByIdController;
const createCityController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newCity = yield service.create(body);
        res.status(201).json(newCity);
    }
    catch (error) {
        next(error);
    }
});
exports.createCityController = createCityController;
const updateCityController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const city = yield service.update(id, body);
        res.json(city);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCityController = updateCityController;
const deleteCityController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCityController = deleteCityController;
