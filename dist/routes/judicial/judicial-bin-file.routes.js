"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_bin_file_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-bin-file.schema"));
const judicial_bin_file_controller_1 = require("../../controllers/judicial/judicial-bin-file.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getJudicialBinFileByIDSchema, createJudicialBinFileSchema, updateJudicialBinFileSchema, getJudicialBinFileByCHBSchema, } = judicial_bin_file_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinFileByCHBSchema, "params"), judicial_bin_file_controller_1.getJudicialBinFileByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinFileByIDSchema, "params"), judicial_bin_file_controller_1.getJudicialBinFileByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialBinFileSchema, "body"), judicial_bin_file_controller_1.createJudicialBinFileController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinFileByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialBinFileSchema, "body"), judicial_bin_file_controller_1.updateJudicialBinFileController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinFileByIDSchema, "params"), judicial_bin_file_controller_1.deleteJudicialBinFileController);
exports.default = router;
