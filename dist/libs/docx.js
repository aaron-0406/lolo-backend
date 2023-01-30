"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParagraph = void 0;
const docx_1 = require("docx");
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
