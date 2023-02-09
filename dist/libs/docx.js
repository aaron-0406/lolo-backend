"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImgRun = exports.createParagraph = void 0;
const docx_1 = require("docx");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const createParagraph = (texts, pageBreak, options) => {
    const textRuns = [];
    for (let i = 0; i < texts.length; i++) {
        const element = texts[i];
        textRuns.push(new docx_1.TextRun({
            font: element.fontFamily ? element.fontFamily : "Calibri(Cuerpo)",
            size: element.fontSize ? element.fontSize * 2 : 10 * 2,
            bold: element.bold,
            color: element.color ? element.color : "#000000",
            italics: element.italic,
            children: [new docx_1.TextRun(element.text ? element.text : "")],
        }));
    }
    const parrafo = new docx_1.Paragraph({
        alignment: (options === null || options === void 0 ? void 0 : options.align) ? options === null || options === void 0 ? void 0 : options.align : docx_1.AlignmentType.JUSTIFIED,
        spacing: {
            after: (options === null || options === void 0 ? void 0 : options.spacingAfter)
                ? (options === null || options === void 0 ? void 0 : options.spacingAfter) * 20
                : options === null || options === void 0 ? void 0 : options.spacingAfter,
        },
        pageBreakBefore: pageBreak,
        children: textRuns,
    });
    return parrafo;
};
exports.createParagraph = createParagraph;
const createImgRun = (imgName, size, options) => {
    const file = fs_1.default.readFileSync(path_1.default.join(__dirname, "../public/download", imgName));
    const image = new docx_1.ImageRun({
        data: file,
        transformation: {
            width: Number(size.split("x")[0]),
            height: Number(size.split("x")[1]),
        },
    });
    return new docx_1.Paragraph({
        alignment: (options === null || options === void 0 ? void 0 : options.align) ? options === null || options === void 0 ? void 0 : options.align : docx_1.AlignmentType.JUSTIFIED,
        spacing: {
            after: (options === null || options === void 0 ? void 0 : options.spacingAfter)
                ? (options === null || options === void 0 ? void 0 : options.spacingAfter) * 20
                : options === null || options === void 0 ? void 0 : options.spacingAfter,
        },
        children: [image],
    });
};
exports.createImgRun = createImgRun;
