import sequelize from "../../../libs/sequelize";
import { Op } from "sequelize";
import boom from "@hapi/boom";
import { ClientType } from "../types/client.type";
import config from "../../../config/config";
import { createFolder } from "../../../libs/aws_bucket";

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
}

export default ClientService;
