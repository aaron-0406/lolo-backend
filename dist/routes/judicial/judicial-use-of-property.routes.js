"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_use_of_property_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-use-of-property.schema"));
const judicial_use_of_property_controller_1 = require("../../controllers/judicial/judicial-use-of-property.controller");
const { createJudicialUseOfPropertySchema, getJudicialUseOfPropertyByCHBSchema, getJudicialUseOfPropertyByIDSchema, updateJudicialUseOfPropertySchema, } = judicial_use_of_property_schema_1.default;
const router = express_1.default.Router();
router.get("/:id", auth_handler_1.JWTAuth, judicial_use_of_property_controller_1.findUseOfPropertyByIdController, (0, validator_handler_1.default)(getJudicialUseOfPropertyByIDSchema, "params"));
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialUseOfPropertyByCHBSchema, "params"), judicial_use_of_property_controller_1.findAllUseOfPropertiesByCHBController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P38-01"), (0, validator_handler_1.default)(createJudicialUseOfPropertySchema, "body"), judicial_use_of_property_controller_1.createUseOfPropertyController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P38-02"), (0, validator_handler_1.default)(getJudicialUseOfPropertyByIDSchema, "params"), (0, validator_handler_1.default)(updateJudicialUseOfPropertySchema, "body"), judicial_use_of_property_controller_1.updateUseOfPropertyController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P38-03"), (0, validator_handler_1.default)(getJudicialUseOfPropertyByIDSchema, "params"), judicial_use_of_property_controller_1.deletedUseOfPropertyController);
exports.default = router;
