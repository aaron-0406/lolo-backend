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
exports.archivos = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
// Middleware for files
const storageArchivos = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../public/docs"),
    filename: (req, file, cb) => {
        const uuid = (0, uuid_1.v4)();
        cb(null, `${uuid}${file.originalname}`);
    },
});
// Filter documents
const filterDocuments = (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const filetypes = /DOC|doc|DOCX|docx|xls|XLS|XLSX|xlsx|ppt|PPT|PPTX|pptx|PDF|pdf|vnd.ms-excel/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path_1.default.extname(file.originalname));
    if (mimetype && extname)
        return cb(null, true);
    cb("Archivo debe ser un documento docx,xlsx,pptx,pdf.");
});
exports.archivos = (0, multer_1.default)({
    storage: storageArchivos,
    fileFilter: filterDocuments,
});
