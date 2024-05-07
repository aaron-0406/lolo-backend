"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_bin_defendant_procedural_action_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-bin-defendant-procedural-action.schema"));
const judicial_bin_defendant_procedural_action_controller_1 = require("../../controllers/judicial/judicial-bin-defendant-procedural-action.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialBinDefendantProceduralActionByIDSchema, createJudicialBinDefendantProceduralActionSchema, updateJudicialBinDefendantProceduralActionSchema, getJudicialBinDefendantProceduralActionByCHBSchema, } = judicial_bin_defendant_procedural_action_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefendantProceduralActionByCHBSchema, "params"), judicial_bin_defendant_procedural_action_controller_1.getJudicialBinDefendantProceduralActionByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefendantProceduralActionByIDSchema, "params"), judicial_bin_defendant_procedural_action_controller_1.getJudicialBinDefendantProceduralActionByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialBinDefendantProceduralActionSchema, "body"), judicial_bin_defendant_procedural_action_controller_1.createJudicialBinDefendantProceduralActionController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefendantProceduralActionByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialBinDefendantProceduralActionSchema, "body"), judicial_bin_defendant_procedural_action_controller_1.updateJudicialBinDefendantProceduralActionController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefendantProceduralActionByIDSchema, "params"), judicial_bin_defendant_procedural_action_controller_1.deleteJudicialBinDefendantProceduralActionController);
exports.default = router;
