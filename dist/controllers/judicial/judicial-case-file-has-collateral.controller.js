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
exports.assingCollateralToCaseFile = exports.getAllRelatedCaseFileAssociatedToCollateral = void 0;
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_case_file_has_collateral_service_1 = __importDefault(require("../../app/judicial/services/judicial-case-file-has-collateral.service"));
const judicial_case_file_has_collateral_model_1 = __importDefault(require("../../db/models/judicial-case-file-has-collateral.model"));
const service = new judicial_case_file_has_collateral_service_1.default();
const userLogService = new user_log_service_1.default();
const { JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE } = judicial_case_file_has_collateral_model_1.default;
const getAllRelatedCaseFileAssociatedToCollateral = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb, numberCaseFile, collateralId } = req.params;
        const collaterals = yield service.findAllRelatedCaseFileAssingCollateral(numberCaseFile, collateralId, Number(chb));
        res.json(collaterals);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRelatedCaseFileAssociatedToCollateral = getAllRelatedCaseFileAssociatedToCollateral;
const assingCollateralToCaseFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { collateralId } = req.params;
        const { newJudicialCasefileHasCollateral } = req.body;
        const result = yield service.assingCollateralToCaseFile(newJudicialCasefileHasCollateral, collateralId);
        yield userLogService.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-01-06-01-01",
            entity: JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
            entityId: Number(collateralId),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.assingCollateralToCaseFile = assingCollateralToCaseFile;
