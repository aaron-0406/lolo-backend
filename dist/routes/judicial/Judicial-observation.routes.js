"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_observation_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-observation.schema"));
const boom_1 = __importDefault(require("@hapi/boom"));
const judicial_observation_controller_1 = require("../../controllers/judicial/judicial-observation.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const multer_handler_1 = require("../../middlewares/multer.handler");
const { getJudicialObservationByIDSchema, createJudicialObservationParamSchema, getJudicialObservationByCHBSchema, updateJudicialObservationParamSchema, getJudicialObservationByCHBSchemaQuery, } = judicial_observation_schema_1.default;
const router = express_1.default.Router();
const multerFile = (req, res, next) => {
    multer_handler_1.archivos.array("file")(req, res, (err) => {
        if (err)
            return next(boom_1.default.badRequest(err));
        return next();
    });
};
router.get("/file-case/:fileCase", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-02-04"), (0, validator_handler_1.default)(getJudicialObservationByCHBSchema, "params"), (0, validator_handler_1.default)(getJudicialObservationByCHBSchemaQuery, "query"), judicial_observation_controller_1.getJudicialObservationByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialObservationByIDSchema, "params"), judicial_observation_controller_1.getJudicialObservationByIdController);
router.post("/:idCustomer/:code", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-02-01"), (0, validator_handler_1.default)(createJudicialObservationParamSchema, "params"), multerFile, judicial_observation_controller_1.createJudicialObservationController);
router.patch("/:id/:idCustomer/:code", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-02-02"), (0, validator_handler_1.default)(updateJudicialObservationParamSchema, "params"), multerFile, judicial_observation_controller_1.updateJudicialObservationController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-02-03"), (0, validator_handler_1.default)(getJudicialObservationByIDSchema, "params"), judicial_observation_controller_1.deleteJudicialObservationController);
exports.default = router;
