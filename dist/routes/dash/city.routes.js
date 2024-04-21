"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const city_schema_1 = __importDefault(require("../../app/dash/schemas/city.schema"));
const city_controller_1 = require("../../controllers/dash/city.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { getCitySchema, createCitySchema, updateCitySchema, getCitiesSchema } = city_schema_1.default;
const router = express_1.default.Router();
router.get("/chb/:customerId", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCitiesSchema, "params"), city_controller_1.getAllCityController);
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCitySchema, "params"), city_controller_1.getCityByIdController);
router.post("/", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(createCitySchema, "body"), city_controller_1.createCityController);
router.put("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCitySchema, "params"), (0, validator_handler_1.default)(updateCitySchema, "body"), city_controller_1.updateCityController);
router.delete("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getCitySchema, "params"), city_controller_1.deleteCityController);
exports.default = router;
