"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_collateral_charges_encumbrances_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-collateral-charges-encumbrances.schema"));
const judicial_collateral_charges_encumbrances_controller_1 = require("../../controllers/judicial/judicial-collateral-charges-encumbrances.controller");
const { getJudicialCollateralChargesEncumbrancesByIDSchema, createJudicialCollateralChargesEncumbrancesSchema, } = judicial_collateral_charges_encumbrances_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, 
// validatorHandler(getJudicialCollateralChargesEncumbrancesByCHBSchema, "params"),
judicial_collateral_charges_encumbrances_controller_1.findAllCollateralChargesEncumbrancesController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralChargesEncumbrancesByIDSchema, "params"), judicial_collateral_charges_encumbrances_controller_1.findCollateralChargesEncumbrancesByIDController);
router.post("/:JudicialCaseFileId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-02"), 
// validatorHandler(getJudicialCollateralChargesEncumbrancesByJudicialCaseFileIdSchema, "params"),
(0, validator_handler_1.default)(createJudicialCollateralChargesEncumbrancesSchema, "body"), judicial_collateral_charges_encumbrances_controller_1.createCollateralChargesEncumbrancesController);
router.patch("/:id", auth_handler_1.JWTAuth, 
// validatorHandler(updateJudicialCollateralChargesEncumbrancesSchema, "body"),
judicial_collateral_charges_encumbrances_controller_1.updateCollateralChargesEncumbrancesController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralChargesEncumbrancesByIDSchema, "params"));
exports.default = router;
