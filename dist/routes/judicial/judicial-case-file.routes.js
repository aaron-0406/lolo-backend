"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_case_file_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-case-file.schema"));
const judicial_case_file_controller_1 = require("../../controllers/judicial/judicial-case-file.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialCaseFileByClientIDSchema, getJudicialCaseFileByIDSchema, getJudicialCaseFileByNumberCaseFileSchema, createJudicialCaseFileSchema, updateJudicialCaseFileSchema, updateJudicialCaseFileProcessStatusSchema, getJudicialCaseFileByCHBSchema, getJudicialCaseFileByCHBSchemaQuery, getJudicialCaseFileByCustomerIdSchema, createQrCodeSchema, } = judicial_case_file_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_case_file_controller_1.getJudicialCaseFileController);
router.get("/client/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByClientIDSchema, "params"), judicial_case_file_controller_1.getJudicialCaseFileByClientIdController);
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByCHBSchema, "params"), (0, validator_handler_1.default)(getJudicialCaseFileByCHBSchemaQuery, "query"), judicial_case_file_controller_1.getJudicialCaseFileByCHBIdController);
router.get("/number-case/:numberCaseFile/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByNumberCaseFileSchema, "params"), judicial_case_file_controller_1.getJudicialCaseFileByNumberCaseFileController);
router.get("/related/:numberCaseFile/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByNumberCaseFileSchema, "params"), judicial_case_file_controller_1.getJudicialCaseFileRelatedController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCaseFileByIDSchema, "params"), judicial_case_file_controller_1.getJudicialCaseFileByIdController);
router.post("/:customerId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-02"), (0, validator_handler_1.default)(getJudicialCaseFileByCustomerIdSchema, "params"), (0, validator_handler_1.default)(createJudicialCaseFileSchema, "body"), judicial_case_file_controller_1.createJudicialCaseFileController);
router.post("/qr-code/:numberCaseFile/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createQrCodeSchema, "params"), judicial_case_file_controller_1.createQrCode);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-03"), (0, validator_handler_1.default)(getJudicialCaseFileByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialCaseFileSchema, "body"), judicial_case_file_controller_1.updateJudicialCaseFileController);
router.patch("/:id/process-status", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-04-01"), (0, validator_handler_1.default)(getJudicialCaseFileByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialCaseFileProcessStatusSchema, "body"), judicial_case_file_controller_1.updateJudicialCaseProcessStatus);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-04"), (0, validator_handler_1.default)(getJudicialCaseFileByIDSchema, "params"), judicial_case_file_controller_1.deleteJudicialCaseFileController);
exports.default = router;
