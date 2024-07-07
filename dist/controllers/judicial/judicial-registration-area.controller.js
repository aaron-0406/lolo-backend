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
exports.deletedRegistrationAreaController = exports.updateRegistrationAreaController = exports.createRegistrationAreaController = exports.findAllRegistrationAreasByCHBController = exports.findRegistrationAreaByIdController = void 0;
const judicial_registration_area_service_1 = __importDefault(require("../../app/judicial/services/judicial-registration-area.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_registration_area_model_1 = __importDefault(require("../../db/models/judicial-registration-area.model"));
const service = new judicial_registration_area_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_REGISTRATION_AREA_TABLE } = judicial_registration_area_model_1.default;
const findRegistrationAreaByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const registrationArea = yield service.findByID(id);
        res.json(registrationArea);
    }
    catch (error) {
        next(error);
    }
});
exports.findRegistrationAreaByIdController = findRegistrationAreaByIdController;
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
    var _a, _b, _c;
    try {
        const body = req.body;
        const newRegistrationArea = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P39-01",
            entity: JUDICIAL_REGISTRATION_AREA_TABLE,
            entityId: Number(newRegistrationArea.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(newRegistrationArea);
    }
    catch (error) {
        next(error);
    }
});
exports.createRegistrationAreaController = createRegistrationAreaController;
const updateRegistrationAreaController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const registrationArea = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P39-02",
            entity: JUDICIAL_REGISTRATION_AREA_TABLE,
            entityId: Number(registrationArea.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(registrationArea);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRegistrationAreaController = updateRegistrationAreaController;
const deletedRegistrationAreaController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const registrationArea = yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P39-03",
            entity: JUDICIAL_REGISTRATION_AREA_TABLE,
            entityId: Number(registrationArea.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(registrationArea);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedRegistrationAreaController = deletedRegistrationAreaController;
