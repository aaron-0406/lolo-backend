"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_binnacle_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-binnacle.schema"));
const judicial_binnacle_controller_1 = require("../../controllers/judicial/judicial-binnacle.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialBinnacleByIDSchema, createJudicialBinnacleSchema, updateJudicialBinnacleSchema, getJudicialBinnacleByCHBSchema, } = judicial_binnacle_schema_1.default;
const router = express_1.default.Router();
router.get("/file-case/:fileCase", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinnacleByCHBSchema, "params"), judicial_binnacle_controller_1.getJudicialBinnacleByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinnacleByIDSchema, "params"), judicial_binnacle_controller_1.getJudicialBinnacleByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialBinnacleSchema, "body"), judicial_binnacle_controller_1.createJudicialBinnacleController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinnacleByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialBinnacleSchema, "body"), judicial_binnacle_controller_1.updateJudicialBinnacleController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinnacleByIDSchema, "params"), judicial_binnacle_controller_1.deleteJudicialBinnacleController);
exports.default = router;
