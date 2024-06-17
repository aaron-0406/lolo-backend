"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boom_1 = __importDefault(require("@hapi/boom"));
const auth_handler_1 = require("../../middlewares/auth.handler");
const compare_excels_controller_1 = require("../../controllers/settings/compare-excels.controller");
const multer_handler_1 = require("../../middlewares/multer.handler");
const compare_excels_schema_1 = require("../../app/settings/schemas/compare-excels.schema");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const router = (0, express_1.Router)();
const multerFiles = multer_handler_1.archivosExcel.fields([
    { name: 'prevFile', maxCount: 1 },
    { name: 'newFile', maxCount: 1 }
]);
// Middleware para verificar que los archivos están presentes
const checkFiles = (req, res, next) => {
    const files = req.files;
    if (!files || !files.prevFile || !files.newFile) {
        return next(boom_1.default.badRequest('Both files are required.'));
    }
    next();
};
router.post('/compare', auth_handler_1.JWTAuth, multerFiles, checkFiles, compare_excels_controller_1.compareExcelsController);
router.post('/send-report-by-email', auth_handler_1.JWTAuth, (0, validator_handler_1.default)(compare_excels_schema_1.compareExcelToSendEmailSchemas, 'body'), compare_excels_controller_1.sendReportByEmailController);
exports.default = router;
