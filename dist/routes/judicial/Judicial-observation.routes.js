"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_observation_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-observation.schema"));
const judicial_obs_type_controller_1 = require("../../controllers/judicial/judicial-obs-type.controller");
const { createJudicialObservationSchema, updateJudicialObservationSchema, getJudicialObservationByIDSchema, getJudicialObservationByCHBAndJudicialCaseSchema, getJudicialObservationByCHBAndJudicialCaseSchemaQuery, } = judicial_observation_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, judicial_obs_type_controller_1.getJudicialObsTypeController);
router.get("/data-by-chb-and-jucial-case/:chb/:judicialCaseId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-04"), (0, validator_handler_1.default)(getJudicialObservationByCHBAndJudicialCaseSchema, "params"), (0, validator_handler_1.default)(getJudicialObservationByCHBAndJudicialCaseSchemaQuery, "query"), judicial_obs_type_controller_1.getJudicialObsTypeByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialObservationByIDSchema, "params"), judicial_obs_type_controller_1.getJudicialObsTypeByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-01"), (0, validator_handler_1.default)(createJudicialObservationSchema, "body"), judicial_obs_type_controller_1.createJudicialObsTypeController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-02"), (0, validator_handler_1.default)(getJudicialObservationByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialObservationSchema, "body"), judicial_obs_type_controller_1.updateJudicialObsTypeController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-03"), (0, validator_handler_1.default)(getJudicialObservationByIDSchema, "params"), judicial_obs_type_controller_1.deleteJudicialObsTypeController);
exports.default = router;
