"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const guarantor_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/guarantor.schema"));
const guarantor_controller_1 = require("../../controllers/extrajudicial/guarantor.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getGuarantorByClientIDSchema, getGuarantorByIDSchema, createGuarantorSchema, updateGuarantorSchema, } = guarantor_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, guarantor_controller_1.getGuarantorController);
router.get("/all-client/:clientId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getGuarantorByClientIDSchema, "params"), guarantor_controller_1.getGuarantorByClientIdController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getGuarantorByIDSchema, "params"), guarantor_controller_1.getGuarantorByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P03-07-01"), (0, validator_handler_1.default)(createGuarantorSchema, "body"), guarantor_controller_1.createGuarantorController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P03-07-02"), (0, validator_handler_1.default)(getGuarantorByIDSchema, "params"), (0, validator_handler_1.default)(updateGuarantorSchema, "body"), guarantor_controller_1.updateGuarantorController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P03-07-03"), (0, validator_handler_1.default)(getGuarantorByIDSchema, "params"), guarantor_controller_1.deleteGuarantorController);
exports.default = router;
