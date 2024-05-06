"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_bin_defeand_procedural_action_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-bin-defeand-procedural-action.schema"));
const judicial_bin_defeand_procedural_action_controller_1 = require("../../controllers/judicial/judicial-bin-defeand-procedural-action.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialBinDefeandProceduralActionByIDSchema, createJudicialBinDefeandProceduralActionSchema, updateJudicialBinDefeandProceduralActionSchema, getJudicialBinDefeandProceduralActionByCHBSchema, } = judicial_bin_defeand_procedural_action_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefeandProceduralActionByCHBSchema, "params"), judicial_bin_defeand_procedural_action_controller_1.getJudicialBinDefeandProceduralActionByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefeandProceduralActionByIDSchema, "params"), judicial_bin_defeand_procedural_action_controller_1.getJudicialBinDefeandProceduralActionByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialBinDefeandProceduralActionSchema, "body"), judicial_bin_defeand_procedural_action_controller_1.createJudicialBinDefeandProceduralActionController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefeandProceduralActionByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialBinDefeandProceduralActionSchema, "body"), judicial_bin_defeand_procedural_action_controller_1.updateJudicialBinDefeandProceduralActionController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinDefeandProceduralActionByIDSchema, "params"), judicial_bin_defeand_procedural_action_controller_1.deleteJudicialBinDefeandProceduralActionController);
exports.default = router;
