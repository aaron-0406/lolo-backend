"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_sede_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-sede.schema"));
const judicial_sede_controller_1 = require("../../controllers/judicial/judicial-sede.controller");
const { createJudicialSedeSchema, updateJudicialSedeSchema, getJudicialSedeByIDSchema, getJudicialSedeByCHBSchema, getJudicialSedeByCHBSchemaQuery, } = judicial_sede_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_sede_controller_1.getJudicialSedeController);
router.get("/all-data-by-chb/:chb", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P28-04"), (0, validator_handler_1.default)(getJudicialSedeByCHBSchema, "params"), (0, validator_handler_1.default)(getJudicialSedeByCHBSchemaQuery, "query"), judicial_sede_controller_1.getJudicialSedeByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialSedeByIDSchema, "params"), judicial_sede_controller_1.getJudicialSedeByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P28-01"), (0, validator_handler_1.default)(createJudicialSedeSchema, "body"), judicial_sede_controller_1.createJudicialSedeController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P28-02"), (0, validator_handler_1.default)(getJudicialSedeByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialSedeSchema, "body"), judicial_sede_controller_1.updateJudicialSedeController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P28-03"), (0, validator_handler_1.default)(getJudicialSedeByIDSchema, "params"), judicial_sede_controller_1.deleteJudicialSedeController);
exports.default = router;
