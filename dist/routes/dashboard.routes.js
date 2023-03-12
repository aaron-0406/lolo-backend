"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const boom_1 = __importDefault(require("@hapi/boom"));
const multer_handler_1 = require("../middlewares/multer.handler");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const dashboard_schema_1 = require("../app/boss/schemas/dashboard.schema");
const dashboard_service_1 = __importDefault(require("../app/boss/services/dashboard.service"));
const client_service_1 = __importDefault(require("../app/extrajudicial/services/client.service"));
const router = (0, express_1.Router)();
const clientService = new client_service_1.default();
const multerFile = (req, res, next) => {
    multer_handler_1.archivosExcel.single("file")(req, res, (err) => {
        if (err)
            return next(boom_1.default.badRequest(err));
        return next();
    });
};
router.post("/xslx", multerFile, (0, validator_handler_1.default)(dashboard_schema_1.excelFileSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file, customerId } = req.body;
        const products = yield dashboard_service_1.default.readExcel(path_1.default.join(__dirname, "../docs", `${file}`));
        res.json(products);
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
}));
exports.default = router;
