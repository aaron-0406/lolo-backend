"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_procedural_way_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-procedural-way.schema"));
const judicial_procedural_way_controller_1 = require("../../controllers/judicial/judicial-procedural-way.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialProceduralWayByIDSchema, createJudicialProceduralWaySchema, updateJudicialProceduralWaySchema, getJudicialProcedurakWayByCHBSchema, } = judicial_procedural_way_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_procedural_way_controller_1.getJudicialProceduralWayController);
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialProcedurakWayByCHBSchema, "params"), judicial_procedural_way_controller_1.getJudicialProceduralWayByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialProceduralWayByIDSchema, "params"), judicial_procedural_way_controller_1.getJudicialProceduralWayByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialProceduralWaySchema, "body"), judicial_procedural_way_controller_1.createJudicialProceduralWayController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialProceduralWayByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialProceduralWaySchema, "body"), judicial_procedural_way_controller_1.updateJudicialProceduralWayController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialProceduralWayByIDSchema, "params"), judicial_procedural_way_controller_1.deleteJudicialProceduralWayController);
exports.default = router;
