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
exports.deletedCollateralFileController = exports.updateCollateralFileController = exports.createCollateralFileController = exports.findCollateralFileByIDController = exports.findAllCollateralFilesController = void 0;
const judicial_collateral_files_service_1 = __importDefault(require("../../app/judicial/services/judicial-collateral-files.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_collateral_files_model_1 = __importDefault(require("../../db/models/judicial-collateral-files.model"));
const service = new judicial_collateral_files_service_1.default();
const userLogService = new user_log_service_1.default();
const { JUDICIAL_COLLATERAL_FILES_TABLE } = judicial_collateral_files_model_1.default;
const findAllCollateralFilesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collateralFiles = yield service.findAll();
        res.json(collateralFiles);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllCollateralFilesController = findAllCollateralFilesController;
const findCollateralFileByIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const collateralFile = yield service.findByID(id);
        res.json(collateralFile);
    }
    catch (error) {
        next(error);
    }
});
exports.findCollateralFileByIDController = findCollateralFileByIDController;
const createCollateralFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newCollateralFile = yield service.create(body);
        yield userLogService.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-01-06-02",
            entity: JUDICIAL_COLLATERAL_FILES_TABLE,
            entityId: Number(newCollateralFile.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(newCollateralFile);
    }
    catch (error) {
        next(error);
    }
});
exports.createCollateralFileController = createCollateralFileController;
const updateCollateralFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const collateralFile = yield service.update(id, body);
        yield userLogService.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P13-01-06-03",
            entity: JUDICIAL_COLLATERAL_FILES_TABLE,
            entityId: Number(collateralFile.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(collateralFile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCollateralFileController = updateCollateralFileController;
const deletedCollateralFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        const collateralFile = yield service.delete(id);
        yield userLogService.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P13-01-06-04",
            entity: JUDICIAL_COLLATERAL_FILES_TABLE,
            entityId: Number(collateralFile.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.json(collateralFile);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedCollateralFileController = deletedCollateralFileController;
