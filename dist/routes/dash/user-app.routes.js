"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const user_app_schema_1 = __importDefault(require("../../app/dash/schemas/user-app.schema"));
const user_app_controller_1 = require("../../controllers/dash/user-app.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { createUserSchema, updateUserSchema, getUserSchema } = user_app_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, user_app_controller_1.getAllUserAppController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getUserSchema, "params"), user_app_controller_1.getUserAppByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createUserSchema, "body"), user_app_controller_1.createUserAppController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getUserSchema, "params"), (0, validator_handler_1.default)(updateUserSchema, "body"), user_app_controller_1.updateUserAppController);
exports.default = router;
