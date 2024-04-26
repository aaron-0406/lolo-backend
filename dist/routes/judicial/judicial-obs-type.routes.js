"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_obs_type_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-obs-type.schema"));
const judicial_obs_type_controller_1 = require("../../controllers/judicial/judicial-obs-type.controller");
const { createJudicialObsTypeSchema, updateJudicialObsTypeSchema, getJudicialObsTypeByIDSchema, getJudicialObsTypeByCHBSchema, getJudicialObsTypeByCHBSchemaQuery, } = judicial_obs_type_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_obs_type_controller_1.getJudicialObsTypeController);
router.get("/all-data-by-chb/:chb", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P23-04"), (0, validator_handler_1.default)(getJudicialObsTypeByCHBSchema, "params"), (0, validator_handler_1.default)(getJudicialObsTypeByCHBSchemaQuery, "query"), judicial_obs_type_controller_1.getJudicialObsTypeByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialObsTypeByIDSchema, "params"), judicial_obs_type_controller_1.getJudicialObsTypeByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P23-01"), (0, validator_handler_1.default)(createJudicialObsTypeSchema, "body"), judicial_obs_type_controller_1.createJudicialObsTypeController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P23-02"), (0, validator_handler_1.default)(getJudicialObsTypeByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialObsTypeSchema, "body"), judicial_obs_type_controller_1.updateJudicialObsTypeController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P23-03"), (0, validator_handler_1.default)(getJudicialObsTypeByIDSchema, "params"), judicial_obs_type_controller_1.deleteJudicialObsTypeController);
exports.default = router;
