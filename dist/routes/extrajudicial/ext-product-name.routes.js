"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const ext_product_name_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/ext-product-name.schema"));
const ext_product_name_controller_1 = require("../../controllers/extrajudicial/ext-product-name.controller");
const { createExtProductNameSchema, updateExtProductNameSchema, getExtProductNameByCHBSchema, getExtProductNameByIDSchema, getExtProductNameByCHBSchemaQuery, } = ext_product_name_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, ext_product_name_controller_1.getExtProductNameController);
router.get("/all-data-by-chb/:chb", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P19-04"), (0, validator_handler_1.default)(getExtProductNameByCHBSchema, "params"), (0, validator_handler_1.default)(getExtProductNameByCHBSchemaQuery, "query"), ext_product_name_controller_1.getExtProductNameByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getExtProductNameByIDSchema, "params"), ext_product_name_controller_1.getExtProductNameByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P19-01"), (0, validator_handler_1.default)(createExtProductNameSchema, "body"), ext_product_name_controller_1.createExtProductNameController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P19-02"), (0, validator_handler_1.default)(getExtProductNameByIDSchema, "params"), (0, validator_handler_1.default)(updateExtProductNameSchema, "body"), ext_product_name_controller_1.updateExtProductNameController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P19-03"), (0, validator_handler_1.default)(getExtProductNameByIDSchema, "params"), ext_product_name_controller_1.deleteExtProductNameController);
exports.default = router;
