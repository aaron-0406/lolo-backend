"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const comment_schema_1 = __importDefault(require("../app/extrajudicial/schemas/comment.schema"));
const comment_controller_1 = require("../controllers/comment.controller");
const auth_handler_1 = require("../middlewares/auth.handler");
const { getCommentByClientIDSchema, getCommentByIDSchema, createCommentSchema, updateCommentSchema, } = comment_schema_1.default;
const router = express_1.default.Router();
router.get("/all-client/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCommentByClientIDSchema, "params"), comment_controller_1.getAllCommentsByClientController);
router.get("/chart/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCommentByClientIDSchema, "params"), comment_controller_1.getChartByCustomerUserController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCommentByIDSchema, "params"), comment_controller_1.getCommentByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createCommentSchema, "body"), comment_controller_1.createCommentController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCommentByIDSchema, "params"), (0, validator_handler_1.default)(updateCommentSchema, "body"), comment_controller_1.updateCommentController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCommentByIDSchema, "params"), comment_controller_1.deleteCommentController);
exports.default = router;
