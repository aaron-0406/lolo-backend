"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const direction_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/direction.schema"));
const direction_controller_1 = require("../../controllers/extrajudicial/direction.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { createDirectionSchema, updateDirectionSchema, getDirectionByClientIDSchema, getDirectionByIDSchema, } = direction_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, direction_controller_1.getAllDirectionsController);
router.get("/all-client/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getDirectionByClientIDSchema, "params"), direction_controller_1.getDirectionByClientIdController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getDirectionByIDSchema, "params"), direction_controller_1.getDirectionByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createDirectionSchema, "body"), direction_controller_1.createDirectionController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getDirectionByIDSchema, "params"), (0, validator_handler_1.default)(updateDirectionSchema, "body"), direction_controller_1.updateDirectionController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getDirectionByIDSchema, "params"), direction_controller_1.deleteDirectionController);
exports.default = router;
