"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const user_log_controller_1 = require("../../controllers/dash/user-log.controller");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const user_log_schema_1 = __importDefault(require("../../app/dash/schemas/user-log.schema"));
const router = express_1.default.Router();
const { getUserLogsByCustomerIdchema } = user_log_schema_1.default;
router.get("/", auth_handler_1.JWTAuth, user_log_controller_1.getAllUserLogsController);
router.get("/all/:customerId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getUserLogsByCustomerIdchema, "params"), user_log_controller_1.getAllUserLogsByCustomerIdController);
exports.default = router;
