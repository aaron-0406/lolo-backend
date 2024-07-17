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
const multer_handler_1 = require("../../middlewares/multer.handler");
const boom_1 = __importDefault(require("@hapi/boom"));
const { getJudicialCollateralFilesByJudicialCollateralIdSchema, createJudicialCollateralFilesParamSchema, getCollateralFileByIDSchema, getJudicialCaseFileByCHBSchemaQuery } = judicial_collateral_files_schema_1.default;
const multerFile = (req, res, next) => {
    multer_handler_1.archivosCollateral.array("file")(req, res, (err) => {
        if (err)
            return next(boom_1.default.badRequest(err));
        return next();
    });
};
const router = express_1.default.Router();
router.get("/:chb/:collateralId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralFilesByJudicialCollateralIdSchema, "params"), (0, validator_handler_1.default)(getJudicialCaseFileByCHBSchemaQuery, "query"), judicial_collateral_files_controller_1.getAllCollateralFilesController);
router.get("/:chb/:collateralId/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-01-03-01"), (0, validator_handler_1.default)(getCollateralFileByIDSchema, "params"), judicial_collateral_files_controller_1.getCollateralFileByIDController);
router.post("/:chb/:collateralId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-01-03-02"), (0, validator_handler_1.default)(createJudicialCollateralFilesParamSchema, "params"), multerFile, judicial_collateral_files_controller_1.createCollateralFileController);
router.delete("/:chb/:collateralId/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-01-03-04"), (0, validator_handler_1.default)(getCollateralFileByIDSchema, "params"), judicial_collateral_files_controller_1.deletedCollateralFileController);
exports.default = router;
