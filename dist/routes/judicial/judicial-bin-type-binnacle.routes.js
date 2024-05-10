"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_bin_type_binnacle_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-bin-type-binnacle.schema"));
const judicial_bin_type_binnacle_controller_1 = require("../../controllers/judicial/judicial-bin-type-binnacle.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialBinTypeBinnacleByIDSchema, createJudicialBinTypeBinnacleSchema, updateJudicialBinTypeBinnacleSchema, getJudicialBinTypeBinnacleByCHBSchema, } = judicial_bin_type_binnacle_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinTypeBinnacleByCHBSchema, "params"), judicial_bin_type_binnacle_controller_1.getJudicialBinTypeBinnacleByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinTypeBinnacleByIDSchema, "params"), judicial_bin_type_binnacle_controller_1.getJudicialBinTypeBinnacleByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialBinTypeBinnacleSchema, "body"), judicial_bin_type_binnacle_controller_1.createJudicialBinTypeBinnacleController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinTypeBinnacleByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialBinTypeBinnacleSchema, "body"), judicial_bin_type_binnacle_controller_1.updateJudicialBinTypeBinnacleController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinTypeBinnacleByIDSchema, "params"), judicial_bin_type_binnacle_controller_1.deleteJudicialBinTypeBinnacleController);
exports.default = router;
