"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_court_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-court.schema"));
const judicial_court_controller_1 = require("../../controllers/judicial/judicial-court.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialCourtByIDSchema, createJudicialCourtSchema, updateJudicialCourtSchema, getJudicialCourtByCHBSchema, } = judicial_court_schema_1.default;
const router = express_1.default.Router();
// router.get("/", JWTAuth, getJudicialCourtController);
router.get("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCourtByCHBSchema, "query"), judicial_court_controller_1.getJudicialCourtByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCourtByIDSchema, "params"), judicial_court_controller_1.getJudicialCourtByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialCourtSchema, "body"), judicial_court_controller_1.createJudicialCourtController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCourtByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialCourtSchema, "body"), judicial_court_controller_1.updateJudicialCourtController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCourtByIDSchema, "params"), judicial_court_controller_1.deleteJudicialCourtController);
exports.default = router;
