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
exports.deletedCollateralController = exports.updateCollateralController = exports.createCollateralController = exports.findAllCollateralByCHBController = exports.findAllCollateralController = void 0;
const judicial_collateral_service_1 = __importDefault(require("../../app/judicial/services/judicial-collateral.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_case_file_has_collateral_model_1 = __importDefault(require("../../db/models/judicial-case-file-has-collateral.model"));
const service = new judicial_collateral_service_1.default();
const userLogService = new user_log_service_1.default();
const { JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE } = judicial_case_file_has_collateral_model_1.default;
const findAllCollateralController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collaterals = yield service.findAll();
        res.json(collaterals);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllCollateralController = findAllCollateralController;
const findAllCollateralByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const collaterals = yield service.findAllByCHB(parseInt(chb));
        res.json(collaterals);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllCollateralByCHBController = findAllCollateralByCHBController;
const createCollateralController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newCollateral = yield service.create(body);
        yield userLogService.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-01-06-02",
            entity: JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
            entityId: Number(newCollateral.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(newCollateral);
    }
    catch (error) {
        next(error);
    }
});
exports.createCollateralController = createCollateralController;
const updateCollateralController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const collateral = yield service.update(id, body);
        res.json(collateral);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCollateralController = updateCollateralController;
const deletedCollateralController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const collateral = yield service.delete(id);
        res.json(collateral);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedCollateralController = deletedCollateralController;
