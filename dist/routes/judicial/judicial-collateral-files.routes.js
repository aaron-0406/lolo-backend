"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_collateral_files_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-collateral-files.schema"));
const judicial_collateral_files_controller_1 = require("../../controllers/judicial/judicial-collateral-files.controller");
const { getJudicialCollateralFilesByIDSchema, getJudicialCollateralFilesByJudicialCollateralIdSchema, createJudicialCollateralFilesSchema, updateJudicialCollateralFilesSchema, } = judicial_collateral_files_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, 
// validatorHandler(getJudicialCollateralFilesByCHBSchema, "params"),
judicial_collateral_files_controller_1.findAllCollateralFilesController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralFilesByIDSchema, "params"), judicial_collateral_files_controller_1.findCollateralFileByIDController);
router.post("/:JudicialCaseFileId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-02"), 
// validatorHandler(getJudicialCollateralFilesByJudicialCaseFileIdSchema, "params"),
(0, validator_handler_1.default)(createJudicialCollateralFilesSchema, "body"), judicial_collateral_files_controller_1.createCollateralFileController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(updateJudicialCollateralFilesSchema, "body"), judicial_collateral_files_controller_1.updateCollateralFileController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralFilesByIDSchema, "params"), judicial_collateral_files_controller_1.deletedCollateralFileController);
exports.default = router;
