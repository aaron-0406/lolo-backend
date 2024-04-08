"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const ext_contact_type_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/ext-contact-type.schema"));
const ext_contact_type_controller_1 = require("../../controllers/extrajudicial/ext-contact-type.controller");
const { createExtContactTypeSchema, updateExtContactTypeSchema, getExtContactTypeByCHBSchema, getExtContactTypeByIDSchema, getContactTypeByCHBSchemaQuery, } = ext_contact_type_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, ext_contact_type_controller_1.getExtContactTypeController);
router.get("/all-data-by-chb/:chb", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P18-04"), (0, validator_handler_1.default)(getExtContactTypeByCHBSchema, "params"), (0, validator_handler_1.default)(getContactTypeByCHBSchemaQuery, "query"), ext_contact_type_controller_1.getExtContactTypeByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getExtContactTypeByIDSchema, "params"), ext_contact_type_controller_1.getExtContactTypeByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P18-01"), (0, validator_handler_1.default)(createExtContactTypeSchema, "body"), ext_contact_type_controller_1.createExtContactTypeController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P18-02"), (0, validator_handler_1.default)(getExtContactTypeByIDSchema, "params"), (0, validator_handler_1.default)(updateExtContactTypeSchema, "body"), ext_contact_type_controller_1.updateExtContactTypeController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P18-03"), (0, validator_handler_1.default)(getExtContactTypeByIDSchema, "params"), ext_contact_type_controller_1.deleteExtContactTypeController);
exports.default = router;
