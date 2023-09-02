"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const role_schema_1 = __importDefault(require("../../app/dash/schemas/role.schema"));
const role_controller_1 = require("../../controllers/dash/role.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getRoleByIdSchema, createRoleSchema, updateRoleSchema, getAllRoleByCustomerIdSchema, } = role_schema_1.default;
const router = express_1.default.Router();
router.get("/customer/:customerId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getAllRoleByCustomerIdSchema, "params"), role_controller_1.getAllRoleByCustomerIdController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getRoleByIdSchema, "params"), role_controller_1.getRoleByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createRoleSchema, "body"), role_controller_1.createRoleController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getRoleByIdSchema, "params"), (0, validator_handler_1.default)(updateRoleSchema, "body"), role_controller_1.updateRoleController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getRoleByIdSchema, "params"), role_controller_1.deleteRoleController);
exports.default = router;
