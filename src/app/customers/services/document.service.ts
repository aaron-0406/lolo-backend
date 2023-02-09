import boom from "@hapi/boom";
import path from "path";
import config from "../../../config/config";
import { readFile } from "../../../libs/aws_bucket";
import { isFileStoredIn } from "../../../libs/helpers";
import { TemplateHasValuesType } from "../types/template-has-values.type";
import { TemplateType } from "../types/template.type";
import util from "util";

import {
  Document,
  Paragraph,
  TextRun,
  Packer,
  Header,
  PageBreak,
  ImageRun,
  AlignmentType,
} from "docx";
import fs from "fs";
import {
  createImgRun,
  createParagraph,
  TemplateDocument,
} from "../../../libs/docx";
import { ValuesType } from "../types/values.type";
import { GuarantorType } from "../../extrajudicial/types/guarantor.type";
import { DirectionType } from "../../extrajudicial/types/direction.type";
import { ClientType } from "../../extrajudicial/types/client.type";
import { TemplateImgType } from "../types/template-img.type";

type TemplateHasValues = TemplateHasValuesType & {
  template: TemplateType & { template_imgs: TemplateImgType[] };
  values: ValuesType[];
};

type ClientTypeDoc = ClientType & {
  guarantor: GuarantorType[];
  direction: DirectionType[];
};

class DocumentService {
  constructor() {}

  async generateDocument(templateHasValues: TemplateHasValues, clients: any[]) {
    // Si no hay una plantilla configurada en bd
    let image: any;
    if (templateHasValues.template.templateJson === "")
      throw boom.badRequest("No hay una plantilla configurada");

    // Si la plantilla ya fue descargada
    const isStored = isFileStoredIn(
      path.join(__dirname, "../../../public/download"),
      templateHasValues.template.templateJson
    );

    // Si la plantilla no está guardada, descargarla de aws
    if (!isStored) {
      await readFile(
        `${config.AWS_PLANTILLA_PATH}${templateHasValues.template.customerId}/${templateHasValues.template.templateJson}`
      );
    }

    // Si hay una imagen como fondo
    if (templateHasValues.template.templatePhoto !== "") {
      // Si ya está descargada
      const isStored = isFileStoredIn(
        path.join(__dirname, "../../../public/download"),
        templateHasValues.template.templatePhoto
      );
      // Si no lo está la descarga
      if (!isStored) {
        await readFile(
          `${config.AWS_PLANTILLA_PATH}${templateHasValues.template.customerId}/${templateHasValues.template.templatePhoto}`
        );
      }
      // IMAGEN FONDO
      image = new ImageRun({
        floating: {
          horizontalPosition: {
            offset: 0,
          },
          verticalPosition: {
            offset: -340000,
          },
        },
        data: fs.readFileSync(
          path.join(
            __dirname,
            "../../../public/download",
            templateHasValues.template.templatePhoto
          )
        ),
        transformation: {
          width: 793,
          height: 1177,
        },
      });
    }

    // Imagenes de la plantilla
    for (let i = 0; i < templateHasValues.template.template_imgs.length; i++) {
      const element = templateHasValues.template.template_imgs[i];
      const isStored = isFileStoredIn(
        path.join(__dirname, "../../../public/download"),
        element.img
      );
      // Por si no están guardadas, descargarlas de aws
      if (!isStored) {
        await readFile(
          `${config.AWS_PLANTILLA_PATH}${templateHasValues.template.customerId}/${element.img}`
        );
      }
    }

    // Reading the template json file
    const readFileAsync = util.promisify(fs.readFile);

    const jsonFile = await readFileAsync(
      path.join(
        __dirname,
        "../../../public/download",
        templateHasValues.template.templateJson
      ),
      "utf8"
    );
    const plantilla = JSON.parse(jsonFile) as { parrafos: TemplateDocument[] };

    let parrafos: Paragraph[] = [];
    // Parrafos por cada cliente
    for (let i = 0; i < clients.length; i++) {
      // Copy
      const newPlantilla = JSON.parse(JSON.stringify(plantilla)) as {
        parrafos: TemplateDocument[];
      };
      const element = clients[i] as ClientTypeDoc;
      const texts = this.makeTexts(
        [...newPlantilla.parrafos],
        templateHasValues.values,
        templateHasValues.template.template_imgs,
        element
      );
      parrafos = [...parrafos, ...texts];
      // Salto de pagina
      if (clients.length !== 1 && i < clients.length - 1) {
        parrafos.push(createParagraph([], true));
      }
    }
    const document = this.makeDocument(parrafos, image);
    return document;

    // Configuración del documento
  }

  private transformText(
    text: string | undefined,
    values: ValuesType[],
    client: ClientTypeDoc
  ) {
    if (text === undefined) return "";
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      text = text.replace(`[${element.field}]`, element.value);
    }
    text = text.replace(`[client]`, client.name);
    return text;
  }

  private makeDocument(parrafos: Paragraph[], image: any) {
    const doc = new Document({
      sections: [
        {
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [image],
                }),
              ],
            }),
          },
          properties: {
            page: {
              margin: {
                top: 1290,
                left: 1290,
                bottom: 1290,
                right: 1290,
              },
            },
          },
          children: parrafos,
        },
      ],
    });
    return doc;
  }

  private makeTexts(
    parrafos: TemplateDocument[],
    values: ValuesType[],
    templateImg: TemplateImgType[],
    client: ClientTypeDoc
  ) {
    const paragraphs = [];
    for (let i = 0; i < parrafos.length; i++) {
      const element = parrafos[i];
      element.texts = element.texts?.map((item) => {
        return {
          ...item,
          text: this.transformText(item.text, values, client),
        };
      });

      // Fiadores
      if (element.texts && element.texts.length > 0) {
        if (element.texts[0].text?.includes("[guarantor]")) {
          for (let j = 0; j < client.guarantor.length; j++) {
            const guarantor = client.guarantor[j];
            const parrafo = createParagraph(
              [{ ...element.texts[0], text: guarantor.name }],
              false,
              element.options
            );
            paragraphs.push(parrafo);
          }
          continue;
        }
      }

      // Direcciones
      if (element.texts && element.texts.length > 0) {
        if (element.texts.some((item) => item.text?.includes("direction"))) {
          for (let k = 0; k < client.direction.length; k++) {
            const direction = client.direction[k];
            let newElement = JSON.parse(JSON.stringify(element.texts));
            newElement = newElement.map((item: any) => {
              return {
                ...item,
                text: item.text
                  ?.replace("[direction.type]", direction.type)
                  .replace("[direction.direction]", direction.direction),
              };
            });

            const parrafo = createParagraph(newElement, false, element.options);
            paragraphs.push(parrafo);
          }
          continue;
        }
      }

      // Imagenes
      if (element.texts && element.texts.length > 0) {
        if (element.texts.some((text) => text.img)) {
          for (let l = 0; l < element.texts.length; l++) {
            const element2 = element.texts[l];
            if (element2.img) {
              const filter = templateImg.filter((item) =>
                element2.img?.includes(item.img)
              );
              if (filter[0]) {
                const newImg = createImgRun(
                  filter[0].img,
                  filter[0].size,
                  element.options
                );
                paragraphs.push(newImg);
              }
            }
          }
          continue;
        }
      }

      const parrafo = createParagraph(
        element.texts ? element.texts : [],
        false,
        element.options
      );
      paragraphs.push(parrafo);
    }
    return paragraphs;
  }
}

export default DocumentService;
