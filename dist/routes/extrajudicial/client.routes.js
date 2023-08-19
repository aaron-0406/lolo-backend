"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const client_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/client.schema"));
const client_controller_1 = require("../../controllers/extrajudicial/client.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getClientByCHBSchema, getClientByCodeSchema, createClientSchema, updateClientSchema, getClientByCustomer, deleteClientByCodeSchema, getClientByCHBSchemaQuery, getDateSchema, } = client_schema_1.default;
const router = express_1.default.Router();
router.get("/", auth_handler_1.JWTAuth, client_controller_1.getAllClientsController);
router.get("/download-excel-daily-management", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getDateSchema, "query"), client_controller_1.downloadExcelDailyManagementController);
router.get("/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getClientByCHBSchema, "params"), (0, validator_handler_1.default)(getClientByCHBSchemaQuery, "query"), client_controller_1.getClientsByCHBController);
router.get("/:chb/details", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getClientByCHBSchema, "params"), client_controller_1.getClientsByCHBDetailsController);
router.get("/:code/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getClientByCodeSchema, "params"), client_controller_1.getClientByCodeCHBController);
router.post("/:idCustomer", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getClientByCustomer, "params"), (0, validator_handler_1.default)(createClientSchema, "body"), client_controller_1.createClientController);
router.patch("/:code/:chb", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getClientByCodeSchema, "params"), (0, validator_handler_1.default)(updateClientSchema, "body"), client_controller_1.updateClientController);
router.delete("/:code/:chb/:idCustomer", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(deleteClientByCodeSchema, "params"), client_controller_1.deleteClientController);
exports.default = router;