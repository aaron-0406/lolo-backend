"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_subject_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-subject.schema"));
const judicial_subject_controller_1 = require("../../controllers/judicial/judicial-subject.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialSubjectByIDSchema, createJudicialSubjectSchema, updateJudicialSubjectSchema, getJudicialSubjectByCHBSchema, } = judicial_subject_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_subject_controller_1.getJudicialSubjectController);
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialSubjectByCHBSchema, "params"), judicial_subject_controller_1.getJudicialSubjectByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialSubjectByIDSchema, "params"), judicial_subject_controller_1.getJudicialSubjectByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialSubjectSchema, "body"), judicial_subject_controller_1.createJudicialSubjectController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialSubjectByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialSubjectSchema, "body"), judicial_subject_controller_1.updateJudicialSubjectController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialSubjectByIDSchema, "params"), judicial_subject_controller_1.deleteJudicialSubjectController);
exports.default = router;
