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
exports.deletedCollateralFileController = exports.createCollateralFileController = exports.getCollateralFileByIDController = exports.getAllCollateralFilesController = void 0;
const judicial_collateral_files_service_1 = __importDefault(require("../../app/judicial/services/judicial-collateral-files.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_collateral_files_model_1 = __importDefault(require("../../db/models/judicial-collateral-files.model"));
const service = new judicial_collateral_files_service_1.default();
const userLogService = new user_log_service_1.default();
const { JUDICIAL_COLLATERAL_FILES_TABLE } = judicial_collateral_files_model_1.default;
const getAllCollateralFilesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collateralId, chb } = req.params;
        const collateralFiles = yield service.findAllByCollateralId(Number(collateralId), Number(chb), req.query);
        res.json(collateralFiles);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCollateralFilesController = getAllCollateralFilesController;
const getCollateralFileByIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { id, chb, collateralId } = req.params;
        const collateralFile = yield service.findOne(Number(chb), Number(collateralId), Number(id));
        yield userLogService.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-01-06-01-03-01",
            entity: JUDICIAL_COLLATERAL_FILES_TABLE,
            entityId: Number(id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(collateralFile);
    }
    catch (error) {
        next(error);
    }
});
exports.getCollateralFileByIDController = getCollateralFileByIDController;
const createCollateralFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { chb, collateralId } = req.params;
        const { files } = req;
        const newCollateralFile = yield service.create(files, Number(chb), Number(collateralId));
        yield userLogService.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P13-01-06-01-03-02",
            entity: JUDICIAL_COLLATERAL_FILES_TABLE,
            entityId: Number(collateralId),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(newCollateralFile);
    }
    catch (error) {
        next(error);
    }
});
exports.createCollateralFileController = createCollateralFileController;
const deletedCollateralFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id, chb, collateralId } = req.params;
        const collateralFile = yield service.delete(id, Number(chb), Number(collateralId));
        yield userLogService.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P13-01-06-01-03-04",
            entity: JUDICIAL_COLLATERAL_FILES_TABLE,
            entityId: Number(id),
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
