"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const ext_tag_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/ext-tag.schema"));
const ext_tag_controller_1 = require("../../controllers/extrajudicial/ext-tag.controller");
const { getExtTagByCHBSchema, getExtTagByIDSchema, createExtTagSchema, updateExtTagSchema, } = ext_tag_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, ext_tag_controller_1.getExtTagsController);
router.get("/all-data-by-chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getExtTagByCHBSchema, "params"), ext_tag_controller_1.getExtTagsByCHBController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getExtTagByIDSchema, "params"), ext_tag_controller_1.getExtTagByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-07-01"), // TODO: Changing permission code
(0, validator_handler_1.default)(createExtTagSchema, "body"), ext_tag_controller_1.createExtTagController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-07-02"), // TODO: Changing permission code
(0, validator_handler_1.default)(getExtTagByIDSchema, "params"), (0, validator_handler_1.default)(updateExtTagSchema, "body"), ext_tag_controller_1.updateExtTagController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-07-03"), // TODO: Changing permission code
(0, validator_handler_1.default)(getExtTagByIDSchema, "params"), ext_tag_controller_1.deleteExtTagController);
exports.default = router;
