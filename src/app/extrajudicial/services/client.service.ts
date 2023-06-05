import sequelize from "../../../libs/sequelize";
import { Op } from "sequelize";
import boom from "@hapi/boom";
import { ClientType } from "../types/client.type";
import config from "../../../config/config";
import { createFolder } from "../../../libs/aws_bucket";
import { Workbook } from "exceljs";
import path from "path";
import CommentService from "./comment.service";
import ProductService from "../../customers/services/product.service";
import moment from "moment";

const { models } = sequelize;

class ClientService {
  constructor() {}

  async findAll() {
    const rta = await models.CLIENT.findAll();
    return rta;
  }

  async findByCustomerIdAndCode(customerId: number, code: string) {
    const rta = await models.CLIENT.findOne({
      where: {
        code,
      },
      include: [
        {
          model: models.CUSTOMER_HAS_BANK,
          as: "customerHasBank",
          where: { idCustomer: customerId },
        },
      ],
    });
    return rta;
  }

  async findAllByCustomerId(customerId: number): Promise<ClientType[]> {
    const rta = await models.CLIENT.findAll({
      include: [
        {
          model: models.CUSTOMER_HAS_BANK,
          as: "customerHasBank",
          where: { idCustomer: customerId },
        },
      ],
    });
    return JSON.parse(JSON.stringify(rta));
  }

  async findAllCHB(chb: string, query: any) {
    const { limit, page, filter, negotiations, funcionarios, users, cities } =
      query;

    const limite = parseInt(limit, 10);
    const pagina = parseInt(page, 10);
    const filtro = filter as string;
    const listNegotiations = JSON.parse(negotiations);
    const listFuncionarios = JSON.parse(funcionarios);
    const listUsers = JSON.parse(users);
    const listCities = JSON.parse(cities);

    const filters: any = {};
    if (filter !== "" && filter !== undefined) {
      filters.name = { [Op.substring]: filtro };
    }
    if (listNegotiations.length) {
      filters.negotiation_id_negotiation = { [Op.in]: listNegotiations };
    }
    if (listFuncionarios.length) {
      filters.funcionario_id_funcionario = { [Op.in]: listFuncionarios };
    }
    if (listUsers.length) {
      filters.customer_user_id_customer_user = { [Op.in]: listUsers };
    }
    if (listCities.length) {
      filters.city_id_city = { [Op.in]: listCities };
    }

    let filtersWhere: any = {
      customer_has_bank_id_customer_has_bank: chb,
    };
    if (Object.keys(filters).length > 0) {
      filtersWhere = {
        [Op.or]: [filters],
        customer_has_bank_id_customer_has_bank: chb,
      };
    }

    const quantity = await models.CLIENT.count({
      where: filtersWhere,
    });

    const clients = await models.CLIENT.findAll({
      include: [
        { model: models.NEGOTIATION, as: "negotiation" },
        {
          model: models.FUNCIONARIO,
          as: "funcionario",
          attributes: { exclude: ["bankId"] },
        },
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
        },
        {
          model: models.CITY,
          as: "city",
        },
      ],
      order: [["name", "ASC"]],
      limit: limite,
      offset: (pagina - 1) * limite,
      where: filtersWhere,
    });

    return { clients, quantity };
  }

  async findAllCHBDetails(chb: string) {
    const rta = await models.CLIENT.findAll({
      include: [
        {
          model: models.DIRECTION,
          as: "direction",
        },
        {
          model: models.GUARANTOR,
          as: "guarantor",
        },
      ],
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });
    return rta;
  }

  async findAllBDetailsAndClientsId(ids: number[]) {
    const rta = await models.CLIENT.findAll({
      include: [
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
          foreignKey: "customerUserId",
          identifier: "id",
          attributes: ["name", "lastName"],
        },
        {
          model: models.FUNCIONARIO,
          as: "funcionario",
          foreignKey: "funcionarioId",
          identifier: "id",
          attributes: ["name"],
        },
        {
          model: models.CITY,
          as: "city",
          foreignKey: "cityId",
          identifier: "id",
          attributes: ["name"],
        },
        {
          model: models.NEGOTIATION,
          as: "negotiation",
          foreignKey: "negotiationId",
          identifier: "id",
          attributes: ["name"],
        },
        {
          model: models.DIRECTION,
          as: "direction",
        },
        {
          model: models.GUARANTOR,
          as: "guarantor",
        },
        {
          model: models.COMMENT,
          as: "comment",
        },
      ],
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rta;
  }

  async findCode(code: string, chb: string) {
    const client = await models.CLIENT.findOne({
      where: {
        code: code,
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!client) {
      throw boom.notFound("Cliente no encontrado");
    }
    return client;
  }

  async create(data: Omit<ClientType, "id" | "createdAt">, idCustomer: number) {
    const client = await models.CLIENT.findOne({
      where: {
        code: data.code,
        customer_has_bank_id_customer_has_bank: data.customerHasBankId,
      },
    });

    if (client) throw boom.notFound("Ya existe un cliente con este código");

    const newClient = await models.CLIENT.create(data);

    // CREATE A FOLDER FOR CLIENT
    await createFolder(
      `${config.AWS_CHB_PATH}${idCustomer}/${data.customerHasBankId}/${data.code}/`
    );
    return newClient;
  }

  async update(code: string, chb: string, changes: ClientType) {
    const client = await this.findCode(code, chb);
    const rta = await client.update(changes);

    return rta;
  }

  async delete(code: string, chb: string, idCustomer: number) {
    const client = await this.findCode(code, chb);
    await client.destroy();
    return { code };
  }

  async readAndUpdateExcelFile(date: Date) {
    const workbook = new Workbook();
    await workbook.xlsx.readFile(
      path.join(
        __dirname,
        "../../../docs/staticDocs/collection_management_excel.xlsx"
      )
    );

    if (workbook.worksheets.length < 1) {
      throw new Error("No se encontraron hojas de trabajo en el archivo Excel");
    }

    const worksheet = workbook.getWorksheet("GESTIONES");
    const detailsWorksheet = workbook.getWorksheet("DETALLE");

    const columnA = detailsWorksheet.getColumn("A");
    const actionDropdownList = columnA.values.slice(2, 36);

    //Logic to update the file
    const commentService = new CommentService();
    const productService = new ProductService();

    const comments = await commentService.findAllByDate(date);
    const commentsWithProducts = await Promise.all(
      comments.map(async (comment: any) => {
        const products = await productService.getByClientCode(
          comment.client.code
        );

        return {
          ...comment,
          client: {
            ...comment.client,
            products: products.map((product) => {
              return {
                code: product.code,
              };
            }),
          },
        };
      })
    );

    const data: any = [];
    commentsWithProducts.forEach((comment) => {
      if (!!comment.managementAction) {
        comment.client.products.forEach((product: any) => {
          data.push({ productCode: product.code, ...comment });
        });
      }
    });

    if (data.length < 2) {
      throw new Error("No se encontraron suficientes gestiones para exportar");
    }

    worksheet.duplicateRow(2, data.length - 1, true);

    for (let index = 0; index < data.length; index++) {
      worksheet.getCell(`A${index + 2}`).value = data[index].productCode;
      worksheet.getCell(`B${index + 2}`).value = data[index].client.code;
      worksheet.getCell(`C${index + 2}`).value = data[index].client.name;

      worksheet.getCell(`D${index + 2}`).value = new Date(data[index].date);
      worksheet.getCell(`D${index + 2}`).numFmt = "dd/MM/yy";

      worksheet.getCell(`E${index + 2}`).value = moment(
        new Date(data[index].hour),
        "HH:mm"
      ).format("HH:mm:00");
      worksheet.getCell(`E${index + 2}`).alignment = { horizontal: "right" };

      //MANAGEMENT ACTIONS
      if (data[index].negotiation === "LLAMADA") {
        worksheet.getCell(`F${index + 2}`).value = "Telefónica";
      } else if (data[index].negotiation === "VISITA") {
        worksheet.getCell(`F${index + 2}`).value = "Campo";
      } else {
        //ADD MORE
        worksheet.getCell(`F${index + 2}`).value = "";
      }

      //MANAGEMENT ACTIONS - ACTIONS
      worksheet.getCell(`G${index + 2}`).value = actionDropdownList.find(
        (action) =>
          action?.toString().trim() ===
          data[index].managementAction.codeAction.trim()
      );
      worksheet.getCell(`G${index + 2}`).dataValidation = {
        type: "list",
        formulae: [`DETALLE!$A$2:$A$35`],
      };

      worksheet.getCell(`H${index + 2}`).value = {
        formula: `=IF(G${index + 2}="","",VLOOKUP(G${
          index + 2
        },DETALLE!$A:$B,2,0))`,
        result: undefined,
        date1904: false,
      };

      worksheet.getCell(`I${index + 2}`).value =
        data[index].comment.toLowerCase();
    }

    const pathname = path.join(
      __dirname,
      "../../../docs/1collection_management_excel.xlsx"
    );
    await workbook.xlsx.writeFile(pathname);
    return pathname;
  }
}

export default ClientService;
