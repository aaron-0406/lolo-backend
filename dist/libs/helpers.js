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
exports.extractDate = exports.saveWordDocument = exports.sumarDias = exports.restarDias = exports.getLastDayOfWeek = exports.getFirstDayOfWeek = exports.sortDaysByDate = exports.formatDate = exports.isFileStoredIn = exports.deleteFile = void 0;
const docx_1 = require("docx");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Delete file function
const deleteFile = (pathname, filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_extra_1.default.unlink(path_1.default.join(__dirname, pathname, filename));
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteFile = deleteFile;
const isFileStoredIn = (dirname, filename) => {
    const files = fs_extra_1.default.readdirSync(dirname);
    return files.some((file) => file === filename);
};
exports.isFileStoredIn = isFileStoredIn;
const formatDate = (date, format = "YYYY-MM-DD") => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Obtener el mes (0-11) y sumarle 1 para obtener el mes en formato (01-12)
    const day = date.getDate(); // Obtener el día del mes (1-31) en formato (01-31)
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    if (format === "DD/MM/YYYY")
        return `${formattedDay}/${formattedMonth}/${year}`;
    return `${year}-${formattedMonth}-${formattedDay}`; // Formatear la fecha como "YYYY-MM-DD"
};
exports.formatDate = formatDate;
const sortDaysByDate = (array, field) => {
    return array.sort((a, b) => {
        const dateA = Date.parse(a[field]);
        const dateB = Date.parse(b[field]);
        if (dateA < dateB) {
            return -1;
        }
        else if (dateA > dateB) {
            return 1;
        }
        else {
            return 0;
        }
    });
};
exports.sortDaysByDate = sortDaysByDate;
const getFirstDayOfWeek = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - today.getDay() + 1));
};
exports.getFirstDayOfWeek = getFirstDayOfWeek;
const getLastDayOfWeek = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - today.getDay() + 7));
};
exports.getLastDayOfWeek = getLastDayOfWeek;
const restarDias = (date, quantityDays) => {
    const day = date.getTime();
    return new Date(day - 24 * 60 * 60 * 1000 * quantityDays);
};
exports.restarDias = restarDias;
const sumarDias = (date, quantityDays) => {
    const day = date.getTime();
    return new Date(day + 24 * 60 * 60 * 1000 * quantityDays);
};
exports.sumarDias = sumarDias;
const saveWordDocument = (doc, templateName) => __awaiter(void 0, void 0, void 0, function* () {
    const docName = `${new Date().getTime()} - ${templateName}.docx`;
    const buffer = yield docx_1.Packer.toBuffer(doc);
    fs_extra_1.default.writeFileSync(path_1.default.join(__dirname, "../public/download", docName), buffer);
    return docName;
});
exports.saveWordDocument = saveWordDocument;
const extractDate = (date) => {
    const splited = date.split("-");
    return {
        day: Number(splited[2]),
        month: Number(splited[1]) - 1,
        year: Number(splited[0]),
    };
};
exports.extractDate = extractDate;
