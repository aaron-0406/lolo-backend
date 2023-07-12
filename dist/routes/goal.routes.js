"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goal_schema_1 = __importDefault(require("../app/extrajudicial/schemas/goal.schema"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const goal_controller_1 = require("../controllers/goal.controller");
const auth_handler_1 = require("../middlewares/auth.handler");
const router = (0, express_1.Router)();
const { getGoalByIdSchema, createGoalSchema, updateGoalSchema, getGoalQuerySchema, } = goal_schema_1.default;
router.get("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getGoalQuerySchema, "query"), goal_controller_1.getGoalController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getGoalByIdSchema, "params"), goal_controller_1.getGoalByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createGoalSchema, "body"), goal_controller_1.createGoalController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getGoalByIdSchema, "params"), (0, validator_handler_1.default)(updateGoalSchema, "body"), goal_controller_1.updateGoalController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getGoalByIdSchema, "params"), goal_controller_1.deleteGoalController);
exports.default = router;
