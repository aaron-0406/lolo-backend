"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const judicial_notary_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-notary.schema"));
const judicial_notary_controller_1 = require("../../controllers/judicial/judicial-notary.controller");
const { createJudicialNotarySchema, getJudicialNotaryByCHBSchema, getJudicialNotaryByIDSchema, updateJudicialNotarySchema, } = judicial_notary_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialNotaryByCHBSchema, "params"), judicial_notary_controller_1.findAllNotariesByCHBController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createJudicialNotarySchema, "body"), judicial_notary_controller_1.createNotaryController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(updateJudicialNotarySchema, "body"), judicial_notary_controller_1.updateNotaryController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialNotaryByIDSchema, "params"), judicial_notary_controller_1.deletedNotaryController);
exports.default = router;
