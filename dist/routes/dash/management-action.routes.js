"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const management_action_schema_1 = __importDefault(require("../../app/dash/schemas/management-action.schema"));
const management_action_controller_1 = require("../../controllers/dash/management-action.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getManagementActionSchema, getManagementActionByCHBSchema, createManagementActionSchema, updateManagementActionSchema, } = management_action_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, management_action_controller_1.getManagementActionsController);
router.get("/all/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getManagementActionByCHBSchema, "params"), management_action_controller_1.getManagementActionByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getManagementActionSchema, "params"), management_action_controller_1.getManagementActionByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P07-01"), (0, validator_handler_1.default)(createManagementActionSchema, "body"), management_action_controller_1.createManagementActionController);
router.put("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P07-02"), (0, validator_handler_1.default)(getManagementActionSchema, "params"), (0, validator_handler_1.default)(updateManagementActionSchema, "body"), management_action_controller_1.updateManagementActionController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P07-03"), (0, validator_handler_1.default)(getManagementActionSchema, "params"), management_action_controller_1.deleteManagementActionController);
exports.default = router;
