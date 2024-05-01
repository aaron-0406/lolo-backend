"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const permission_schema_1 = __importDefault(require("../../app/dash/schemas/permission.schema"));
const permission_controller_1 = require("../../controllers/dash/permission.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getPermissionByIdSchema, createPermissionSchema, updatePermissionSchema, getPermissionsSchema, } = permission_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getPermissionsSchema, "query"), permission_controller_1.getAllPermissionController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getPermissionByIdSchema, "params"), permission_controller_1.getPermissionByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createPermissionSchema, "body"), permission_controller_1.createPermissionController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getPermissionByIdSchema, "params"), (0, validator_handler_1.default)(updatePermissionSchema, "body"), permission_controller_1.updatePermissionController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getPermissionByIdSchema, "params"), permission_controller_1.deletePermissionController);
exports.default = router;
