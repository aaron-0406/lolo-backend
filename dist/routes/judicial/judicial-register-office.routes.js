"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_register_office_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-register-office.schema"));
const judicial_register_office_controller_1 = require("../../controllers/judicial/judicial-register-office.controller");
const { createJudicialRegisterOfficeSchema, getJudicialRegisterOfficeByCHBSchema, getJudicialRegisterOfficeByIDSchema, updateJudicialRegisterOfficeSchema, } = judicial_register_office_schema_1.default;
const router = express_1.default.Router();
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialRegisterOfficeByIDSchema, "params"), judicial_register_office_controller_1.findRegisterOfficeByIdController);
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialRegisterOfficeByCHBSchema, "params"), judicial_register_office_controller_1.findAllRegisterOfficesByCHBController);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P40-01"), (0, validator_handler_1.default)(createJudicialRegisterOfficeSchema, "body"), judicial_register_office_controller_1.createRegisterOfficeController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P40-02"), (0, validator_handler_1.default)(updateJudicialRegisterOfficeSchema, "body"), judicial_register_office_controller_1.updateRegisterOfficeController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P40-03"), (0, validator_handler_1.default)(getJudicialRegisterOfficeByIDSchema, "params"), judicial_register_office_controller_1.deletedRegisterOfficeController);
exports.default = router;
