"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_collateral_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-collateral.schema"));
const judicial_collateral_controller_1 = require("../../controllers/judicial/judicial-collateral.controller");
const { getJudicialCollateralByIDSchema, getJudicialCollateralByCHBSchema, createJudicialCollateralSchema, updateJudicialCollateralSchema, } = judicial_collateral_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralByCHBSchema, "params"), judicial_collateral_controller_1.findAllCollateralByCHBController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialCollateralSchema, "body"), judicial_collateral_controller_1.createCollateralController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(updateJudicialCollateralSchema, "body"), judicial_collateral_controller_1.updateCollateralController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralByIDSchema, "params"), judicial_collateral_controller_1.deletedCollateralController);
exports.default = router;
