import { Paragraph, TextRun, AlignmentType, ImageRun } from "docx";
import path from "path";
import fs from "fs";

type TextOptionsType = {
  text?: string;
  img?: string;
  bold?: boolean;
  italic?: boolean;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
};

type ParagraphOptionsType = {
  spacingAfter?: number;
  align?: AlignmentType;
};

export type TemplateDocument = {
  texts: TextOptionsType[];
  options?: ParagraphOptionsType;
};

export const createParagraph = (
  texts: TextOptionsType[],
  pageBreak: boolean,
  options?: ParagraphOptionsType
) => {
  const textRuns: TextRun[] = [];
  for (let i = 0; i < texts.length; i++) {
    const element = texts[i];
    textRuns.push(
      new TextRun({
        font: element.fontFamily ? element.fontFamily : "Calibri(Cuerpo)",
        size: element.fontSize ? element.fontSize * 2 : 10 * 2,
        bold: element.bold,
        color: element.color ? element.color : "#000000",
        italics: element.italic,
        children: [new TextRun(element.text ? element.text : "")],
      })
    );
  }

  const parrafo = new Paragraph({
    alignment: options?.align ? options?.align : AlignmentType.JUSTIFIED,
    spacing: {
      after: options?.spacingAfter
        ? options?.spacingAfter * 20
        : options?.spacingAfter,
    },
    pageBreakBefore: pageBreak,
    children: textRuns,
  });
  return parrafo;
};

export const createImgRun = (
  imgName: string,
  size: string,
  options?: ParagraphOptionsType
) => {
  const file = fs.readFileSync(
    path.join(__dirname, "../public/download", imgName)
  );
  const image = new ImageRun({
    data: file,
    transformation: {
      width: Number(size.split("x")[0]),
      height: Number(size.split("x")[1]),
    },
  });
  return new Paragraph({
    alignment: options?.align ? options?.align : AlignmentType.JUSTIFIED,
    spacing: {
      after: options?.spacingAfter
        ? options?.spacingAfter * 20
        : options?.spacingAfter,
    },
    children: [image],
  });
};