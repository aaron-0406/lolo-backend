import boom from "@hapi/boom";
import path from "path";
import config from "../../../config/config";
import { readFile } from "../../../libs/aws_bucket";
import { formatDate, isFileStoredIn } from "../../../libs/helpers";
import { TemplateHasValuesType } from "../types/template-has-values.type";
import { TemplateType } from "../types/template.type";
import util from "util";

import {
  Document,
  Paragraph,
  Header,
  ImageRun,
  Table,
  AlignmentType,
  HeightRule,
  VerticalAlign,
} from "docx";
import fs from "fs";
import {
  createImgRun,
  createParagraph,
  createTable,
  TemplateDocument,
} from "../../../libs/docx";
import { ValuesType } from "../types/values.type";
import { GuarantorType } from "../../extrajudicial/types/guarantor.type";
import { DirectionType } from "../../extrajudicial/types/direction.type";
import { ClientType } from "../../extrajudicial/types/client.type";
import { TemplateImgType } from "../types/template-img.type";
import { ProductType } from "../types/product.tyoe";
import { CustomerUserType } from "../types/customer-user.type";
import { FuncionarioType } from "../../boss/types/funcionario.type";
import { CityType } from "../../boss/types/city.type";
import { NegotiationType } from "../../boss/types/negotiation.type";
import { CommentType } from "../../extrajudicial/types/comment.type";
import CommentService from "../../extrajudicial/services/comment.service";
import CustomerService from "./customer.service";

const commentService = new CommentService();
type TemplateHasValues = TemplateHasValuesType & {
  template: TemplateType & { template_imgs: TemplateImgType[] };
  values: ValuesType[];
};

type ClientTypeDoc = ClientType & {
  guarantor: GuarantorType[];
  direction: DirectionType[];
  product: ProductType[];
  customerUser: CustomerUserType;
  funcionario: FuncionarioType;
  city: CityType;
  negotiation: NegotiationType;
  comment: CommentType[];
};

type ReportType = {
  Weeks: { dia: string; cantidad: number }[];
  Gestores: { id: number; name: string; cantidad: number }[];
  Banks: { id: number; name: string; cantidad: number }[];
  companyName: string;
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

    let parrafos: (Paragraph | Table)[] = [];
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
      // parrafos = [...parrafos, ...texts, ];
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

  async generateReport(template: TemplateType, customerUserId: number = -1) {
    // Si no hay una plantilla configurada en bd
    let image: any;
    if (template.templateJson === "")
      throw boom.badRequest("No hay una plantilla configurada");

    // Si la plantilla ya fue descargada
    const isStored = isFileStoredIn(
      path.join(__dirname, "../../../public/download"),
      template.templateJson
    );

    // Si la plantilla no está guardada, descargarla de aws
    if (!isStored) {
      await readFile(
        `${config.AWS_PLANTILLA_PATH}${template.customerId}/${template.templateJson}`
      );
    }

    // Si hay una imagen como fondo
    if (template.templatePhoto !== "") {
      // Si ya está descargada
      const isStored = isFileStoredIn(
        path.join(__dirname, "../../../public/download"),
        template.templatePhoto
      );
      // Si no lo está la descarga
      if (!isStored) {
        await readFile(
          `${config.AWS_PLANTILLA_PATH}${template.customerId}/${template.templatePhoto}`
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
            template.templatePhoto
          )
        ),
        transformation: {
          width: 793,
          height: 1177,
        },
      });
    }
    const readFileAsync = util.promisify(fs.readFile);

    const jsonFile = await readFileAsync(
      path.join(__dirname, "../../../public/download", template.templateJson),
      "utf8"
    );
    const plantilla = JSON.parse(jsonFile) as { parrafos: TemplateDocument[] };
    let parrafos: (Paragraph | Table)[] = [];

    const commentsWeekly =
      customerUserId === -1
        ? await commentService.getCommentsGroupByDayWeekly(template.customerId)
        : await commentService.getCommentsGroupByDayWeeklyUser(
            template.customerId,
            customerUserId
          );

    const commentsByUserWeekly =
      customerUserId === -1
        ? await commentService.getCommentsGroupByGestorWeekly(
            template.customerId
          )
        : await commentService.getCommentsGroupByGestorWeeklyUser(
            template.customerId,
            customerUserId
          );

    const commentsByBanksWeekly =
      customerUserId === -1
        ? await commentService.getCommentsGroupByBanks(template.customerId)
        : await commentService.getCommentsGroupByBanksUser(
            template.customerId,
            customerUserId
          );
    const customer = await new CustomerService().findOneByID(
      template.customerId + ""
    );

    const report: ReportType = {
      Banks: commentsByBanksWeekly,
      companyName: customer.dataValues.companyName,
      Gestores: commentsByUserWeekly,
      Weeks: commentsWeekly,
    };

    const texts = this.makeTextsReport([...plantilla.parrafos], report);
    parrafos = [...parrafos, ...texts];
    const document = this.makeDocument(parrafos, image);
    return document;
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
    text = text.replace(`[client.code]`, client.code);
    text = text.replace(
      `[client.negotiationId]`,
      String(client.negotiation.name)
    );
    text = text.replace(`[client.dniOrRuc]`, String(client.dniOrRuc));
    text = text.replace(`[client.name]`, client.name);
    text = text.replace(`[client.salePerimeter]`, String(client.salePerimeter));
    text = text.replace(`[client.phone]`, String(client.phone));
    text = text.replace(`[client.email]`, String(client.email));
    text = text.replace(`[client.cityId]`, String(client.city.name));
    text = text.replace(
      `[client.funcionarioId]`,
      String(client.funcionario.name)
    );
    text = text.replace(
      `[client.customerUserId]`,
      String(`${client.customerUser.name} ${client.customerUser.lastName}`)
    );
    return text;
  }

  private makeDocument(parrafos: (Paragraph | Table)[], image: any) {
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

      //Tablas
      if (
        element.tablets &&
        element.tablets.rows &&
        element.tablets.rows?.length > 0
      ) {
        if (
          element.tablets.rows[1].children[0].children[0].texts.some((item) =>
            item.text?.includes("guarantor")
          ) &&
          !!client.guarantor
        ) {
          const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
          let newElement = [
            JSON.parse(JSON.stringify(element.tablets.rows))[1],
          ];

          let rows = [];

          for (let k = 0; k < client.guarantor.length; k++) {
            const guarantor = client.guarantor[k];

            rows.push(
              ...newElement.map((row: any) => {
                return {
                  children: row.children.map((cell: any) => {
                    return {
                      children: cell.children.map((paragraph: any) => {
                        return {
                          texts: paragraph.texts.map((item: any) => {
                            return {
                              ...item,
                              text: item.text
                                ?.replace("[guarantor.id]", guarantor.id)
                                ?.replace("[guarantor.name]", guarantor.name)
                                ?.replace("[guarantor.phone]", guarantor.phone)
                                ?.replace("[guarantor.email]", guarantor.email),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              })
            );
          }

          const table = createTable([headerRow, ...rows]);
          paragraphs.push(table);
        }

        if (
          element.tablets.rows[1].children[0].children[0].texts.some((item) =>
            item.text?.includes("direction")
          ) &&
          !!client.direction
        ) {
          const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
          let newElement = [
            JSON.parse(JSON.stringify(element.tablets.rows))[1],
          ];

          let rows = [];

          for (let k = 0; k < client.direction.length; k++) {
            const direction = client.direction[k];

            rows.push(
              ...newElement.map((row: any) => {
                return {
                  children: row.children.map((cell: any) => {
                    return {
                      children: cell.children.map((paragraph: any) => {
                        return {
                          texts: paragraph.texts.map((item: any) => {
                            return {
                              ...item,
                              text: item.text
                                ?.replace("[direction.id]", direction.id)
                                ?.replace("[direction.type]", direction.type)
                                ?.replace(
                                  "[direction.direction]",
                                  direction.direction
                                ),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              })
            );
          }

          const table = createTable([headerRow, ...rows]);
          paragraphs.push(table);
        }

        if (
          element.tablets.rows[1].children[0].children[0].texts.some((item) =>
            item.text?.includes("product")
          ) &&
          !!client.product
        ) {
          const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
          let newElement = [
            JSON.parse(JSON.stringify(element.tablets.rows))[1],
          ];

          let rows = [];

          for (let k = 0; k < client.product.length; k++) {
            const product = client.product[k];

            rows.push(
              ...newElement.map((row: any) => {
                return {
                  children: row.children.map((cell: any) => {
                    return {
                      children: cell.children.map((paragraph: any) => {
                        return {
                          texts: paragraph.texts.map((item: any) => {
                            return {
                              ...item,
                              text: item.text
                                ?.replace("[product.id]", product.id)
                                ?.replace("[product.code]", product.code)
                                ?.replace("[product.name]", product.name)
                                ?.replace("[product.state]", product.state),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              })
            );
          }

          const table = createTable([headerRow, ...rows]);
          paragraphs.push(table);
        }

        if (
          element.tablets.rows[1].children[0].children[0].texts.some((item) =>
            item.text?.includes("comment")
          ) &&
          !!client.comment
        ) {
          const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
          let newElement = [
            JSON.parse(JSON.stringify(element.tablets.rows))[1],
          ];

          let rows = [];

          for (let k = 0; k < client.comment.length; k++) {
            const comment = client.comment[k];

            rows.push(
              ...newElement.map((row: any) => {
                return {
                  children: row.children.map((cell: any) => {
                    return {
                      children: cell.children.map((paragraph: any) => {
                        return {
                          texts: paragraph.texts.map((item: any) => {
                            return {
                              ...item,
                              text: item.text
                                ?.replace("[comment.id]", comment.id)
                                ?.replace("[comment.comment]", comment.comment)
                                ?.replace(
                                  "[comment.negotiation]",
                                  comment.negotiation
                                )
                                ?.replace("[comment.date]", comment.date)
                                ?.replace(
                                  "[comment.hour]",
                                  new Date(comment.hour).toLocaleTimeString(
                                    "es-PE",
                                    { hour12: false }
                                  )
                                ),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              })
            );
          }

          const table = createTable([headerRow, ...rows]);
          paragraphs.push(table);
        }
      }

      // Fiadores
      if (element.texts && element.texts.length > 0) {
        if (element.texts.some((item) => item.text?.includes("guarantor"))) {
          for (let k = 0; k < client.guarantor.length; k++) {
            const guarantor = client.guarantor[k];
            let newElement = JSON.parse(JSON.stringify(element.texts));
            newElement = newElement.map((item: any) => {
              return {
                ...item,
                text: item.text
                  ?.replace("[guarantor.id]", guarantor.id)
                  ?.replace("[guarantor.name]", guarantor.name)
                  ?.replace("[guarantor.phone]", guarantor.phone)
                  ?.replace("[guarantor.email]", guarantor.email),
              };
            });

            const parrafo = createParagraph(newElement, false, element.options);
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
                  ?.replace("[direction.id]", direction.id)
                  ?.replace("[direction.type]", direction.type)
                  ?.replace("[direction.direction]", direction.direction),
              };
            });

            const parrafo = createParagraph(newElement, false, element.options);
            paragraphs.push(parrafo);
          }
          continue;
        }
      }

      // Productos
      if (element.texts && element.texts.length > 0) {
        if (element.texts.some((item) => item.text?.includes("product"))) {
          for (let k = 0; k < client.product.length; k++) {
            const product = client.product[k];
            let newElement = JSON.parse(JSON.stringify(element.texts));
            newElement = newElement.map((item: any) => {
              return {
                ...item,
                text: item.text
                  ?.replace("[product.id]", product.id)
                  ?.replace("[product.code]", product.code)
                  ?.replace("[product.name]", product.name)
                  ?.replace("[product.state]", product.state),
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

  private makeTextsReport(
    parrafos: TemplateDocument[],
    reportType: ReportType
  ) {
    const paragraphs = [];
    for (let i = 0; i < parrafos.length; i++) {
      const element = parrafos[i];
      element.texts = element.texts?.map((item) => {
        return {
          ...item,
          text: this.transformTextReport(item.text, reportType),
        };
      });

      //Tablas
      if (
        element.tablets &&
        element.tablets.rows &&
        element.tablets.rows?.length > 0
      ) {
        if (
          element.tablets.rows[1].children[0].children[0].texts.some((item) =>
            item.text?.includes("day")
          ) &&
          !!reportType.Weeks
        ) {
          const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
          let newElement = [
            JSON.parse(JSON.stringify(element.tablets.rows))[1],
          ];

          let rows = [];

          // Week
          for (let k = 0; k < reportType.Weeks.length; k++) {
            const week = reportType.Weeks[k];
            rows.push(
              ...newElement.map((row: any) => {
                return {
                  children: row.children.map((cell: any) => {
                    return {
                      children: cell.children.map((paragraph: any) => {
                        return {
                          texts: paragraph.texts.map((item: any) => {
                            return {
                              ...item,
                              text: item.text
                                ?.replace(
                                  "[day.name]",
                                  this.obtenerNombreDia(week.dia)
                                )
                                ?.replace(
                                  "[day.quantity_comments]",
                                  week.cantidad
                                ),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              })
            );
          }

          const table = createTable(
            [headerRow, ...rows],
            {
              alignment: AlignmentType.CENTER,
              width: { size: "16cm" },
            },
            {
              height: { value: "1cm", rule: HeightRule.EXACT },
            },
            {
              verticalAlign: VerticalAlign.CENTER,
            }
          );

          paragraphs.push(table);
        }

        if (
          element.tablets.rows[1].children[0].children[0].texts.some((item) =>
            item.text?.includes("gestor")
          ) &&
          !!reportType.Gestores
        ) {
          const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
          let newElement = [
            JSON.parse(JSON.stringify(element.tablets.rows))[1],
          ];

          let rows = [];

          // Gestores
          for (let k = 0; k < reportType.Gestores.length; k++) {
            const gestor = reportType.Gestores[k];

            rows.push(
              ...newElement.map((row: any) => {
                return {
                  children: row.children.map((cell: any) => {
                    return {
                      children: cell.children.map((paragraph: any) => {
                        return {
                          texts: paragraph.texts.map((item: any) => {
                            return {
                              ...item,
                              text: item.text
                                ?.replace("[gestor.id]", gestor.id)
                                ?.replace("[gestor.name]", gestor.name)
                                ?.replace(
                                  "[gestor.quantity_comments]",
                                  gestor.cantidad
                                ),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              })
            );
          }

          const table = createTable(
            [headerRow, ...rows],
            {
              alignment: AlignmentType.CENTER,
              width: { size: "16cm" },
            },
            {
              height: { value: "1cm", rule: HeightRule.EXACT },
            },
            {
              verticalAlign: VerticalAlign.CENTER,
            }
          );
          paragraphs.push(table);
        }

        if (
          element.tablets.rows[1].children[0].children[0].texts.some((item) =>
            item.text?.includes("bank")
          ) &&
          !!reportType.Gestores
        ) {
          const headerRow = JSON.parse(JSON.stringify(element.tablets.rows))[0];
          let newElement = [
            JSON.parse(JSON.stringify(element.tablets.rows))[1],
          ];

          let rows = [];

          // Bancos
          for (let k = 0; k < reportType.Banks.length; k++) {
            const bank = reportType.Banks[k];

            rows.push(
              ...newElement.map((row: any) => {
                return {
                  children: row.children.map((cell: any) => {
                    return {
                      children: cell.children.map((paragraph: any) => {
                        return {
                          texts: paragraph.texts.map((item: any) => {
                            return {
                              ...item,
                              text: item.text
                                ?.replace("[bank.id]", bank.id)
                                ?.replace("[bank.name]", bank.name)
                                ?.replace(
                                  "[bank.quantity_comments]",
                                  bank.cantidad
                                ),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              })
            );
          }

          const table = createTable(
            [headerRow, ...rows],
            {
              alignment: AlignmentType.CENTER,
              width: { size: "16cm" },
            },
            {
              height: { value: "1cm", rule: HeightRule.EXACT },
            },
            {
              verticalAlign: VerticalAlign.CENTER,
            }
          );
          paragraphs.push(table);
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

  private transformTextReport(
    text: string | undefined,
    reportType: ReportType
  ) {
    if (text === undefined) return "";
    const hoy = new Date();
    const primerDia = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1));
    const ultimoDia = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 7));

    const milPrimerDia = primerDia.getTime();
    const milUltimoDia = ultimoDia.getTime();

    const primerDiaSemanaPasada = formatDate(
      new Date(milPrimerDia - 24 * 60 * 60 * 1000 * 7),
      "DD/MM/YYYY"
    );
    const ultimoDiaSemanaPasada = formatDate(
      new Date(milUltimoDia - 24 * 60 * 60 * 1000 * 7),
      "DD/MM/YYYY"
    );

    text = text.replace(
      `[date]`,
      `${primerDiaSemanaPasada} - ${ultimoDiaSemanaPasada}`
    );
    text = text.replace(`[customer.name]`, String(reportType.companyName));
    return text;
  }

  private obtenerNombreDia(fecha: string): string {
    const diasSemana = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const fechaObj = new Date(fecha);
    const indiceDia = fechaObj.getDay();

    const nombreDia = diasSemana[indiceDia];
    return (
      nombreDia +
      " " +
      `${fecha.split("-")[2]}/${fecha.split("-")[1]}/${fecha.split("-")[0]}`
    );
  }
}

export default DocumentService;
