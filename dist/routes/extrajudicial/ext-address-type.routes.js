"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const ext_address_type_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/ext-address-type.schema"));
const ext_address_type_controller_1 = require("../../controllers/extrajudicial/ext-address-type.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { createAddressTypeSchema, updateAddressTypeSchema, getAddressTypeByChbSchema, getAddressTypeByIDSchema, getAddressTypeByIDAndCHBSchema, } = ext_address_type_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, ext_address_type_controller_1.getAllAddressTypesController);
router.get("/all/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getAddressTypeByChbSchema, "params"), ext_address_type_controller_1.getAddressTypeByCHBController);
router.get("/:id/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getAddressTypeByIDAndCHBSchema, "params"), ext_address_type_controller_1.getAddressTypeByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P16-01"), (0, validator_handler_1.default)(createAddressTypeSchema, "body"), ext_address_type_controller_1.createAddressTypeController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P16-02"), (0, validator_handler_1.default)(getAddressTypeByIDSchema, "params"), (0, validator_handler_1.default)(updateAddressTypeSchema, "body"), ext_address_type_controller_1.updateAddressTypeController);
router.delete("/:id/:chb", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P16-03"), (0, validator_handler_1.default)(getAddressTypeByIDAndCHBSchema, "params"), ext_address_type_controller_1.deleteAddressTypeController);
exports.default = router;
