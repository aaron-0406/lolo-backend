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
exports.default = router;
