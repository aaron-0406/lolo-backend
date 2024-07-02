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
exports.deletedCollateralChargesEncumbrancesTypeLoadController = exports.updateCollateralChargesEncumbrancesTypeLoadController = exports.createCollateralChargesEncumbrancesTypeLoadController = exports.getCollateralChargesEncumbrancesTypeLoadByIDController = exports.getAllCollateralChargesEncumbrancesTypeLoadController = void 0;
const judicial_collateral_charges_encumbrances_type_load_service_1 = __importDefault(require("../../app/judicial/services/judicial-collateral-charges-encumbrances-type-load.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_collateral_charges_encumbrances_type_load_model_1 = __importDefault(require("../../db/models/judicial-collateral-charges-encumbrances-type-load.model"));
const service = new judicial_collateral_charges_encumbrances_type_load_service_1.default();
const userLogService = new user_log_service_1.default();
const { JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE } = judicial_collateral_charges_encumbrances_type_load_model_1.default;
const getAllCollateralChargesEncumbrancesTypeLoadController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const collateralChargesEncumbrancesTypeLoad = yield service.findAll(chb);
        res.json(collateralChargesEncumbrancesTypeLoad);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCollateralChargesEncumbrancesTypeLoadController = getAllCollateralChargesEncumbrancesTypeLoadController;
const getCollateralChargesEncumbrancesTypeLoadByIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const collateralChargesEncumbrancesTypeLoad = yield service.findByID(id);
        res.json(collateralChargesEncumbrancesTypeLoad);
    }
    catch (error) {
        next(error);
    }
});
exports.getCollateralChargesEncumbrancesTypeLoadByIDController = getCollateralChargesEncumbrancesTypeLoadByIDController;
const createCollateralChargesEncumbrancesTypeLoadController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newCollateralChargesEncumbrancesTypeLoad = yield service.create(body);
        yield userLogService.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P42-01",
            entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
            entityId: Number(newCollateralChargesEncumbrancesTypeLoad.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(newCollateralChargesEncumbrancesTypeLoad);
    }
    catch (error) {
        next(error);
    }
});
exports.createCollateralChargesEncumbrancesTypeLoadController = createCollateralChargesEncumbrancesTypeLoadController;
const updateCollateralChargesEncumbrancesTypeLoadController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const collateralChargesEncumbrancesTypeLoad = yield service.update(id, body);
        yield userLogService.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P42-02",
            entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
            entityId: Number(collateralChargesEncumbrancesTypeLoad.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(collateralChargesEncumbrancesTypeLoad);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCollateralChargesEncumbrancesTypeLoadController = updateCollateralChargesEncumbrancesTypeLoadController;
const deletedCollateralChargesEncumbrancesTypeLoadController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const collateralChargesEncumbrancesTypeLoad = yield service.delete(id);
        yield userLogService.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P42-03",
            entity: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
            entityId: Number(collateralChargesEncumbrancesTypeLoad.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(collateralChargesEncumbrancesTypeLoad);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedCollateralChargesEncumbrancesTypeLoadController = deletedCollateralChargesEncumbrancesTypeLoadController;
