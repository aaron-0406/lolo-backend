"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_case_file_has_collateral_controller_1 = require("../../controllers/judicial/judicial-case-file-has-collateral.controller");
const judicial_case_file_has_collateral_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-case-file-has-collateral.schema"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getAllRelatedCaseFileAssociateToCollateralSchema, getCaseFileHasCollateralByIdSchema, assingCollateralToCaseFileSchema } = judicial_case_file_has_collateral_schema_1.default;
const router = express_1.default.Router();
router.get("/:chb/:numberCaseFile/:collateralId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getAllRelatedCaseFileAssociateToCollateralSchema, "params"), judicial_case_file_has_collateral_controller_1.getAllRelatedCaseFileAssociatedToCollateral);
router.post("/:collateralId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-01-01"), (0, validator_handler_1.default)(getCaseFileHasCollateralByIdSchema, "params"), (0, validator_handler_1.default)(assingCollateralToCaseFileSchema, "body"), judicial_case_file_has_collateral_controller_1.assingCollateralToCaseFile);
exports.default = router;
