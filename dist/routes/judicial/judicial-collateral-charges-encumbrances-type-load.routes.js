"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_collateral_charges_encumbrances_type_load_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-collateral-charges-encumbrances-type-load.schema"));
const judicial_collateral_charges_encumbrances_type_load_controller_1 = require("../../controllers/judicial/judicial-collateral-charges-encumbrances-type-load.controller");
const { getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema, getJudicialCollateralChargesEncumbrancesTypeLoadByCHBSchema, createJudicialCollateralChargesEncumbrancesTypeLoadSchema, updateJudicialCollateralChargesEncumbrancesTypeLoadSchema, } = judicial_collateral_charges_encumbrances_type_load_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralChargesEncumbrancesTypeLoadByCHBSchema, "params"), judicial_collateral_charges_encumbrances_type_load_controller_1.getAllCollateralChargesEncumbrancesTypeLoadController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema, "params"), judicial_collateral_charges_encumbrances_type_load_controller_1.getCollateralChargesEncumbrancesTypeLoadByIDController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P42-01"), (0, validator_handler_1.default)(createJudicialCollateralChargesEncumbrancesTypeLoadSchema, "body"), judicial_collateral_charges_encumbrances_type_load_controller_1.createCollateralChargesEncumbrancesTypeLoadController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P42-02"), (0, validator_handler_1.default)(updateJudicialCollateralChargesEncumbrancesTypeLoadSchema, "body"), judicial_collateral_charges_encumbrances_type_load_controller_1.updateCollateralChargesEncumbrancesTypeLoadController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P42-03"), (0, validator_handler_1.default)(getJudicialCollateralChargesEncumbrancesTypeLoadByIDSchema, "params"), judicial_collateral_charges_encumbrances_type_load_controller_1.deletedCollateralChargesEncumbrancesTypeLoadController);
exports.default = router;
