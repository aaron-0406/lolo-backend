"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_case_file_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/judicial-case-file.schema"));
const judicial_case_file_controller_1 = require("../../controllers/extrajudicial/judicial-case-file.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialCaseFileByClientIDSchema, getJudicialCaseFileByIDSchema, createJudicialCaseFileSchema, updateJudicialCaseFileSchema, } = judicial_case_file_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_case_file_controller_1.getJudicialCaseFileController);
router.get("/all-client/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByClientIDSchema, "params"), judicial_case_file_controller_1.getJudicialCaseFileByClientIdController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByIDSchema, "params"), judicial_case_file_controller_1.getJudicialCaseFileByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialCaseFileSchema, "body"), judicial_case_file_controller_1.createJudicialCaseFileController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialCaseFileSchema, "body"), judicial_case_file_controller_1.updateJudicialCaseFileController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByIDSchema, "params"), judicial_case_file_controller_1.deleteJudicialCaseFileController);
exports.default = router;
