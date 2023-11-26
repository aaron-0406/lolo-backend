"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const ext_contact_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/ext-contact.schema"));
const ext_contact_controller_1 = require("../../controllers/extrajudicial/ext-contact.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getExtContactByClientIDSchema, getExtContactByIDSchema, createExtContactSchema, updateExtContactSchema, } = ext_contact_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, ext_contact_controller_1.getExtContactController);
router.get("/all-client/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getExtContactByClientIDSchema, "params"), ext_contact_controller_1.getExtContactClientIdController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getExtContactByIDSchema, "params"), ext_contact_controller_1.getExtContactByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-04-01"), //changing
(0, validator_handler_1.default)(createExtContactSchema, "body"), ext_contact_controller_1.createExtContactController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-04-02"), //changing
(0, validator_handler_1.default)(getExtContactByIDSchema, "params"), (0, validator_handler_1.default)(updateExtContactSchema, "body"), ext_contact_controller_1.updateExtContactController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-04-03"), //changing
(0, validator_handler_1.default)(getExtContactByIDSchema, "params"), ext_contact_controller_1.deleteExtContactController);
exports.default = router;
