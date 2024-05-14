"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_process_reason_controller_1 = require("../../controllers/judicial/judicial-process-reason.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_process_reason_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-process-reason.schema"));
const { getJudicialReasonProcessByCHBSchema, getJudicialReasonProcessByIDSchema, createJudicialReasonProcessSchema, updateJudicialReasonProcessSchema, } = judicial_process_reason_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_process_reason_controller_1.getJudicialProcessReasonController);
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialReasonProcessByCHBSchema, "params"), judicial_process_reason_controller_1.getJudicialProcessReasonByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialReasonProcessByIDSchema, "params"), judicial_process_reason_controller_1.getJudicialProcessReasonByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialReasonProcessSchema, "body"), judicial_process_reason_controller_1.createJudicialProcessReasonController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialReasonProcessByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialReasonProcessSchema, "body"), judicial_process_reason_controller_1.updateJudicialProcessReasonController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialReasonProcessByIDSchema, "params"), judicial_process_reason_controller_1.deleteJudicialProcessReasonController);
exports.default = router;
