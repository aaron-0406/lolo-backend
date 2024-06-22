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
exports.deletedUseOfPropertyController = exports.updateUseOfPropertyController = exports.createUseOfPropertyController = exports.findAllUseOfPropertiesByCHBController = exports.findAllUseOfPropertiesController = void 0;
const judicial_use_of_property_service_1 = __importDefault(require("../../app/judicial/services/judicial-use-of-property.service"));
const service = new judicial_use_of_property_service_1.default();
const findAllUseOfPropertiesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const useOfProperties = yield service.findAll();
        res.json(useOfProperties);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllUseOfPropertiesController = findAllUseOfPropertiesController;
const findAllUseOfPropertiesByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const useOfProperties = yield service.findAllByCHB(parseInt(chb));
        res.json(useOfProperties);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllUseOfPropertiesByCHBController = findAllUseOfPropertiesByCHBController;
const createUseOfPropertyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newUseOfProperty = yield service.create(body);
        res.json(newUseOfProperty);
    }
    catch (error) {
        next(error);
    }
});
exports.createUseOfPropertyController = createUseOfPropertyController;
const updateUseOfPropertyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const useOfProperty = yield service.update(id, body);
        res.json(useOfProperty);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUseOfPropertyController = updateUseOfPropertyController;
const deletedUseOfPropertyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const useOfProperty = yield service.delete(id);
        res.json(useOfProperty);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedUseOfPropertyController = deletedUseOfPropertyController;
