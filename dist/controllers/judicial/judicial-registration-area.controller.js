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
exports.deletedRegistrationAreaController = exports.updateRegistrationAreaController = exports.createRegistrationAreaController = exports.findAllRegistrationAreasByCHBController = exports.findAllRegistrationAreasController = void 0;
const judicial_registration_area_service_1 = __importDefault(require("../../app/judicial/services/judicial-registration-area.service"));
const service = new judicial_registration_area_service_1.default();
const findAllRegistrationAreasController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrationAreas = yield service.findAll();
        res.json(registrationAreas);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllRegistrationAreasController = findAllRegistrationAreasController;
const findAllRegistrationAreasByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const registrationAreas = yield service.findAllByCHB(parseInt(chb));
        res.json(registrationAreas);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllRegistrationAreasByCHBController = findAllRegistrationAreasByCHBController;
const createRegistrationAreaController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newRegistrationArea = yield service.create(body);
        res.json(newRegistrationArea);
    }
    catch (error) {
        next(error);
    }
});
exports.createRegistrationAreaController = createRegistrationAreaController;
const updateRegistrationAreaController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const registrationArea = yield service.update(id, body);
        res.json(registrationArea);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRegistrationAreaController = updateRegistrationAreaController;
const deletedRegistrationAreaController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const registrationArea = yield service.delete(id);
        res.json(registrationArea);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedRegistrationAreaController = deletedRegistrationAreaController;
