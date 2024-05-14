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
const { getJudicialBinFileByIDSchema, getFileSchema } = judicial_bin_file_schema_1.default;
const router = express_1.default.Router();
router.get("/single/:idCustomer/:code/:chb/:judicialFileCaseId/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getFileSchema, "params"), judicial_bin_file_controller_1.findFileByIdController);
router.delete("/:idCustomer/:chb/:code/:judicialFileCaseId/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialBinFileByIDSchema, "params"), judicial_bin_file_controller_1.deleteJudicialBinFileController);
exports.default = router;
