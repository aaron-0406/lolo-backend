"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_bin_procedural_stage_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-bin-procedural-stage.schema"));
const judicial_bin_procedural_stage_controller_1 = require("../../controllers/judicial/judicial-bin-procedural-stage.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialBinProceduralStageByIDSchema, createJudicialBinProceduralStageSchema, updateJudicialBinProceduralStageSchema, getJudicialBinProceduralStageByCHBSchema, } = judicial_bin_procedural_stage_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinProceduralStageByCHBSchema, "params"), judicial_bin_procedural_stage_controller_1.getJudicialBinProceduralStageByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinProceduralStageByIDSchema, "params"), judicial_bin_procedural_stage_controller_1.getJudicialBinProceduralStageByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialBinProceduralStageSchema, "body"), judicial_bin_procedural_stage_controller_1.createJudicialBinProceduralStageController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinProceduralStageByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialBinProceduralStageSchema, "body"), judicial_bin_procedural_stage_controller_1.updateJudicialBinProceduralStageController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinProceduralStageByIDSchema, "params"), judicial_bin_procedural_stage_controller_1.deleteJudicialBinProceduralStageController);
exports.default = router;
