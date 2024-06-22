"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_registration_area_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-registration-area.schema"));
const judicial_registration_area_controller_1 = require("../../controllers/judicial/judicial-registration-area.controller");
const { createJudicialRegistrationAreaSchema, getJudicialRegistrationAreaByCHBSchema, getJudicialRegistrationAreaByIDSchema, updateJudicialRegistrationAreaSchema, } = judicial_registration_area_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialRegistrationAreaByCHBSchema, "params"), judicial_registration_area_controller_1.findAllRegistrationAreasByCHBController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialRegistrationAreaSchema, "body"), judicial_registration_area_controller_1.createRegistrationAreaController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(updateJudicialRegistrationAreaSchema, "body"), judicial_registration_area_controller_1.updateRegistrationAreaController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialRegistrationAreaByIDSchema, "params"), judicial_registration_area_controller_1.deletedRegistrationAreaController);
exports.default = router;
