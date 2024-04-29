"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const negotiation_schema_1 = __importDefault(require("../../app/dash/schemas/negotiation.schema"));
const negotiation_controller_1 = require("../../controllers/dash/negotiation.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getNegotiationSchema, getNegotiationByCHBSchema, createNegotiationSchema, updateNegotiationSchema, } = negotiation_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, negotiation_controller_1.getNegotiationsController);
router.get("/all/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getNegotiationByCHBSchema, "params"), negotiation_controller_1.getNegotiationsByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getNegotiationSchema, "params"), negotiation_controller_1.getNegotiationsByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P09-01"), (0, validator_handler_1.default)(createNegotiationSchema, "body"), negotiation_controller_1.createNegotiationController);
router.put("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P09-02"), (0, validator_handler_1.default)(getNegotiationSchema, "params"), (0, validator_handler_1.default)(updateNegotiationSchema, "body"), negotiation_controller_1.updateNegotiationController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P09-03"), (0, validator_handler_1.default)(getNegotiationSchema, "params"), negotiation_controller_1.deleteNegotiationController);
exports.default = router;
